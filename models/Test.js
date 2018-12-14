const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Question = require('./Question')
const Examination = require('./Examination')

const Test = sequelize.define('test', {
    test_id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    subject : {
        type: Sequelize.STRING
    },
    available_time : {
        type: Sequelize.TIME
    }

})

Test.hasMany(Question,{as: "Questions"})
Test.hasMany(Examination,{as: "TestExaminations"})

module.exports =  Test
