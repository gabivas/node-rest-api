const Sequelize = require('sequelize')
const sequelize =  require('../config/db-connection').sequelize

const TestSustinut = require('./TestSustinut')

const RezultatTest = sequelize.define('rezultat_test', {
    id_rezultat_test: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    punctaj: {
        type: Sequelize.REAL
    },
    promovat : {
        type: Sequelize.BOOLEAN
    }

});
RezultatTest.belongsTo(TestSustinut, {foreignKey: 'id_test_sustinut'})
module.exports =  RezultatTest

