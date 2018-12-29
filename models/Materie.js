const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Materie = sequelize.define('materie', {
    id_materie: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    nume: {
        type: Sequelize.STRING
    }
})

module.exports = Materie