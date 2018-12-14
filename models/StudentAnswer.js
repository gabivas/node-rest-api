const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

//const Student = require('./Student')
//const Examination = require('./Examination')


const StudentAnswer = sequelize.define('student_answer', {
    student_answer_id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    question_id: {
        type: Sequelize.INTEGER
    },
    answer : {
        type: Sequelize.STRING
    }

})
//StudentAnswer.belongsTo(Student)
//StudentAnswer.hasOne(Examination)

module.exports =  StudentAnswer
