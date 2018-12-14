const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Student = require('./Student')
const Team = require('./Team')

const TeamStudent = sequelize.define('team_student', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    student_id: {
        type: Sequelize.INTEGER,
        unique: 'team_student'
    },
    team_id: {
        type: Sequelize.INTEGER,
        unique: 'team_student',
        references: null
    }
})


Student.belongsToMany(Team, {through: TeamStudent, foreignKey: 'student_id'});
Team.belongsToMany(Student, {through: TeamStudent, foreignKey: 'team_id' });

module.exports = TeamStudent