const axios = require('axios');
class ZabbixAPI {
  constructor(url, username, password) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.authToken = null;
  }

  async login() {
    const data = {
      jsonrpc: "2.0",
      method: "user.login",
      params: {
        user: this.username,
        password: this.password,
      },
      id: 1,
      auth: null,
    };
  
    const response = await axios.post(this.url + "/api_jsonrpc.php", data);
  
    if (response.data.result) {
      this.authToken = response.data.result;
      console.log("Login bem-sucedido! Token:", this.authToken);
    } else {
      throw new Error("Falha ao autenticar com o Zabbix.");
    }
  
    return response.data;
  }

  async logout() {
    const data = {
      jsonrpc: "2.0",
      method: "user.logout",
      params: [],
      id: 1,
      auth: this.authToken,
    };

    const response = await axios.post(this.url + "/api_jsonrpc.php", data);
    return response.data;
  }

  
    // Função para obter itens do Zabbix
    async getItems(hostId) {
      const data = {
        jsonrpc: "2.0",
        method: "item.get",
        params: {
          output: "extend",
          hostids: String(hostId), // hostId como string, como na requisição original
          search: {
            key_: "" // Pode ser ajustado via parâmetro também
          },
          sortfield: "name"
        },
        auth: this.authToken,
        id: 1
      };
    
      const response = await axios.post(this.url + "/api_jsonrpc.php", data);
      console.log("Resposta da API (item.get):", response.data);
      return response.data.result;
    }
    
}
module.exports = ZabbixAPI;
