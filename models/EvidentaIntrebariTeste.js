const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Test = require('./Test')
const Intrebare = require('./Intrebare')

Test.belongsToMany(Intrebare, {as: 'Intrebari',
    through: 'evidenta_intrebari_teste', foreignKey: 'id_test'
})
Intrebare.belongsToMany(Test, {as: 'Teste',
    through: 'evidenta_intrebari_teste', foreignKey: 'id_intrebare'

})

module.exports = sequelize.sync()

