const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize


const RaspunsStudent = sequelize.define('raspuns_student', {
    id_raspuns_student: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    id_intrebare: {
        type: Sequelize.INTEGER
    }

})

module.exports =  RaspunsStudent
