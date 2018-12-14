const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize


const Team = sequelize.define('team', {
    team_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    team_name: {
        type: Sequelize.STRING
    }
})

module.exports =  Team

