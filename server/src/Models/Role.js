//import sequelize
const Sequelize = require('sequelize');
var sequelize = require('../config/database');

var Role = sequelize.define('role', {
    role: Sequelize.STRING
},
{
    // remove created at update
    timestamps: false
});

module.exports = Role;