const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Question = sequelize.define('question', {
    question_id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    subject: {
        type: Sequelize.STRING
    },
    theme: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.STRING
    },
    answers: {
        type: Sequelize.JSON
    },
    correctAnswer: {
        type: Sequelize.STRING
    },
    difficulty: {
        type: Sequelize.STRING
    }

})

module.exports = Question

