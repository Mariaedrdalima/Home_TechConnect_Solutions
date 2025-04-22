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

  
  // adicione aqui a função getItens
}
module.exports = ZabbixAPI;
