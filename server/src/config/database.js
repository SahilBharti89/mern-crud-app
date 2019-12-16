var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'mern-crud', // database name
    'root', // username
    'sqlr00t', // password
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;