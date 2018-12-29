const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize
const RaspunsStudent = require('./RaspunsStudent')
const Student = require('./Student')
const TestSustinut = sequelize.define('test_sustinut', {
    id_test_sustinut: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    inceput_la: {
        type: Sequelize.DATE
    },
    terminat_la: {
        type: Sequelize.DATE
    }
})
TestSustinut.belongsTo(Student, { foreignKey: 'id_student' })
TestSustinut.hasMany(RaspunsStudent, {foreignKey: 'id_raspuns_student', sourceKey: 'id_test_sustinut',foreignKeyConstraint: true})
module.exports = TestSustinut

