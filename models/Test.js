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

Test.hasMany(Question,{foreignKey: 'question_id', sourceKey: 'test_id'})
Test.hasMany(Examination,{foreignKey: 'examination_id', sourceKey: 'test_id'})

module.exports =  Test
