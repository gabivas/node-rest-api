const Sequelize = require('sequelize')
const DataTypes = require('sequelize/lib/data-types')
const sequelize =  require('../config/db-connection').sequelize

const Materie = require('./Materie')
const Profesor = require('./Profesor')

Materie.belongsToMany(Profesor, {as: 'Profesori',
    through: 'evidenta_materii_profesori', foreignKey: 'id_materie'
})
Profesor.belongsToMany(Materie, {as: 'Materii',
    through: 'evidenta_materii_profesori', foreignKey: 'id_profesor'
})

module.exports =  sequelize.sync()
