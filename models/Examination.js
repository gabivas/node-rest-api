const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize
const StudentAnswer = require('./StudentAnswer')
const Examination = sequelize.define('examination', {
    examination_id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    startedAt: {
        type: Sequelize.DATE
    },
    finishedAt: {
        type: Sequelize.DATE
    }
})

Examination.hasMany(StudentAnswer, {foreignKey: 'student_answer_id', sourceKey: 'examination_id'})
module.exports = Examination

