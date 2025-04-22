const ZabbixAPI = require('../../api/zabbix.js');
const ZabbixData = require('../../models/testeModel/zabbixData');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getZabbixData = async (req, res) => {
  const zabbix = new ZabbixAPI(
    process.env.ZABBIX_LINK,
    process.env.ZABBIX_LOGIN,
    process.env.ZABBIX_PASSWORD
  );

  try {
    await zabbix.login();

    // Chama o método getItems corretamente
    const items = await zabbix.getItems(11077);  // Passando o host ID diretamente
    console.log("Itens recebidos do Zabbix:", items);

    // Usar transaction para inserção em lote
    const createdItems = await Promise.all(
        items.map(item =>
          prisma.downHistory.create({
            data: {
              nome: item.name || 'Sem nome',
              key: item.key_ || 'Sem chave',
              hostId: item.hostid || 'Desconhecido',
              hostName: item.host || 'Desconhecido',
              value: parseFloat(item.lastvalue) || 0,
              date: new Date(),
            },
          })
        )
      );

    res.status(200).send('Dados salvos com sucesso!');
  } catch (err) {
    console.error('Erro ao salvar dados do Zabbix:', err);
    res.status(500).json({ message: 'Erro ao salvar dados', error: err.message });
  } finally {
    await zabbix.logout(); // Sempre fazer logout
  }
};

async function getMetricsByInterface(req, res) {
    const { interfaceName, metric } = req.query;
  
    if (!interfaceName || !metric) {
      return res.status(400).json({ error: 'interfaceName e metric são obrigatórios' });
    }
  
    try {
      const records = await prisma.downHistory.findMany({
        where: {
          nome: {
            contains: metric,  // Agora com ILIKE, busca insensível ao caso
            mode: 'insensitive', // Ignora maiúsculas/minúsculas
          },
          key: {
            contains: interfaceName,
            mode: 'insensitive', // Ignora maiúsculas/minúsculas
          },
        },
        orderBy: {
          date: 'asc',
        },
        select: {
          date: true,
          value: true,
        },
      });
  
      // Verifique se encontrou algum dado
      if (records.length === 0) {
        return res.status(404).json({ message: 'Nenhum dado encontrado' });
      }
  
      const data = records.map((record) => ({
        date: record.date,
        value: record.value,
      }));
  
      res.json({ interface: interfaceName, metric, data });
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
      res.status(500).json({ error: 'Erro interno ao buscar métricas' });
    }
  }

module.exports = { getZabbixData, getMetricsByInterface };
