const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async create(data) {
    return await prisma.zabbixData.create({
      data,
    });
  },
};