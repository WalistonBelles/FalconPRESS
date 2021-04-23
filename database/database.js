const Sequelize = require('sequelize');

const connection = new Sequelize ('falconpress', 'root', '060698', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;