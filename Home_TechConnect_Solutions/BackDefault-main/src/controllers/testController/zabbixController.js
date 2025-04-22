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

const getDownHistoryData = async (req, res) => {
    try {
      const downHistoryData = await prisma.downHistory.findMany();
      res.status(200).json(downHistoryData);
    } catch (err) {
      console.error('Erro ao buscar dados do DownHistory:', err);
      res.status(500).json({ message: 'Erro ao buscar dados', error: err.message });
    }
  };

module.exports = { getZabbixData, getDownHistoryData};
