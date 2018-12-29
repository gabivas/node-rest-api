const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Intrebare = require('./Intrebare')
const TestSustinut = require('./TestSustinut')
const TestPartajat = require('./TestPartajat')

const Test = sequelize.define('test', {
    id_test: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    nume : {
        type: Sequelize.STRING
    },
    descriere : {
        type: Sequelize.STRING
    },
    timp_disponibil : {
        type: Sequelize.STRING
    },
    este_public : {
        type: Sequelize.BOOLEAN
    },
    id_materie : {
        type: Sequelize.INTEGER
    }

})

Test.hasMany(Intrebare,{foreignKey: 'id_intrebare', sourceKey: 'id_test',foreignKeyConstraint: true})
Test.hasMany(TestSustinut,{foreignKey: 'id_test_sustinut', sourceKey: 'id_test',foreignKeyConstraint: true})
Test.hasMany(TestPartajat,{foreignKey: 'id_test_partajat', sourceKey: 'id_test',foreignKeyConstraint: true})
module.exports =  Test
