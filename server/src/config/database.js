var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'mern-crud', // database name
    'root', // username
    'bharti123', // password
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;