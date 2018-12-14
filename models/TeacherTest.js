const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Teacher = require('./Teacher')
const Test = require('./Test')

const TeacherTest = sequelize.define('teacher_test', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teacher_id: {
        type: Sequelize.INTEGER,
        unique: 'teacher_test'
    },
    test_id: {
        type: Sequelize.INTEGER,
        unique: 'teacher_test',
        references: null
    }
})

Teacher.belongsToMany(Test, { through: TeacherTest });
Test.belongsToMany(Teacher, { through: TeacherTest });

module.exports = TeacherTest