const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const VariantaRaspuns = sequelize.define('varianta_raspuns', {
    id_varianta_raspuns: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    text: {
        type: Sequelize.STRING
    },
    este_corect: {
        type: Sequelize.BOOLEAN
    },
})

module.exports = VariantaRaspuns

