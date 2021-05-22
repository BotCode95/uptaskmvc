const Sequelize = require('sequelize');
const sequelize = new Sequelize('uptasknode', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool : {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },


    storage: 'path/to/database.sqlite'
});

module.exports = sequelize;