const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const TestPartajat = sequelize.define('test_partajat', {
    id_test_partajat: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    id_test: {
        type: Sequelize.INTEGER
    },
    id_profesor: {
        type: Sequelize.INTEGER
    }
})

module.exports =  TestPartajat