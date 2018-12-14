const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Test = require('./Test')
const Question = require('./Question')

const TestQuestion= sequelize.define('test_question', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question_id: {
        type: Sequelize.INTEGER,
        unique: 'test_question'
    },
    test_id: {
        type: Sequelize.INTEGER,
        unique: 'test_question',
        references: null
    }
})

Test.belongsToMany(Question, {through: TestQuestion, foreignKey: 'test_id'});
Question.belongsToMany(Test, {through: TestQuestion, foreignKey: 'question_id'});

module.exports = TestQuestion