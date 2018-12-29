const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const VariantaRaspuns = require('./VariantaRaspuns')
const Intrebare = sequelize.define('intrebare', {

    id_intrebare: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    text: {
        type: Sequelize.STRING
    },
    tema: {
        type: Sequelize.STRING
    },
    dificultate: {
        type: Sequelize.STRING
    },
    timp_maxim_raspuns: {
        type: Sequelize.INTEGER
    },
    id_profesor: {
        type: Sequelize.INTEGER
    },
    id_materie: {
        type: Sequelize.INTEGER
    },
})

Intrebare.hasMany(VariantaRaspuns, {foreignKey: 'id_varianta_raspuns', sourceKey: 'id_intrebare',foreignKeyConstraint: true} )

module.exports = Intrebare

