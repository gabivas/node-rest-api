const Sequelize = require('sequelize')


const sequelize =  require('../config/db-connection').sequelize

const StudentAnswer = require('./StudentAnswer')

const Student = sequelize.define('student', {
    student_id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName : {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email : {
        type: Sequelize.STRING,
        validate : {
            isEmail : true
        }
    },
    class : {
        type: Sequelize.INTEGER,
    },
    course: {
        type: Sequelize.STRING
    },

})
Student.hasMany(StudentAnswer,{foreignKey: 'student_answer_id', sourceKey: 'student_id'})

module.exports =  Student

