const { Router } = require("express");
const testController = require("./controllers/testController");
const zabbixController = require("../src/controllers/testController/zabbixController");

const routes = Router();

routes.get("/test", testController.handle);
routes.get("/zabbix-data", zabbixController.getZabbixData);
routes.get('/api/down-history', zabbixController.getMetricsByInterface);

module.exports = routes;