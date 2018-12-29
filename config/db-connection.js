const Sequelize = require('sequelize')

// Connect to mysql

const sequelize =  new Sequelize( 'qdemy','root','1234',{
    host: 'localhost',
    dialect: 'mysql',
    define : {
        timestamps : false,
        freezeTableName: true
    },
    logging: false
})

module.exports.sequelize = sequelize