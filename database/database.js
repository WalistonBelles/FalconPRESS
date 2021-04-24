const Sequelize = require('sequelize');

const connection = new Sequelize ('falconpress', 'root', '060698', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;