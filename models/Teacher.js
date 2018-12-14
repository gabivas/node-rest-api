const Sequelize = require('sequelize')


const sequelize =  require('../config/db-connection').sequelize
const Test = require('./Test')

const Teacher = sequelize.define('teacher', {
    teacher_id: {
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
    password : {
        type : Sequelize.STRING
    },
    email : {
        type: Sequelize.STRING,
        validate : {
            isEmail : true
        }
    }
});

module.exports =  Teacher