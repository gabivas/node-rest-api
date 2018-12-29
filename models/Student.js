const Sequelize = require('sequelize')


const sequelize =  require('../config/db-connection').sequelize

const TestSustinut = require('./TestSustinut')

const Student = sequelize.define('student', {
    id_student: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    nume: {
        type: Sequelize.STRING
    },
    prenume : {
        type: Sequelize.STRING
    },
    parola: {
        type: Sequelize.STRING
    },
    email : {
        type: Sequelize.STRING,
        validate : {
            isEmail : true
        }
    }


})
//Student.hasMany(TestSustinut,{foreignKey: 'id_test_sustinut', sourceKey: 'id_student',foreignKeyConstraint: true})

module.exports =  Student

