const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Student = require('./Student')
const Echipa = require('./Echipa')
Student.belongsToMany(Echipa, {
    as: 'Echipe',
    through: 'evidenta_studenti_echipe',
    foreignKey: 'id_student'
})
Echipa.belongsToMany(Student, {
    as: 'Studenti',
    through: 'evidenta_studenti_echipe',
    foreignKey: 'id_echipa'
})



module.exports = sequelize.sync()


