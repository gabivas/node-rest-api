const Sequelize = require('sequelize')
const sequelize =  require('../config/db-connection').sequelize

const Test = require('./Test')
const Profesor = sequelize.define('profesor', {
    id_profesor: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    nume: {
        type: Sequelize.STRING
    },
    prenume : {
        type: Sequelize.STRING
    },
    parola : {
        type : Sequelize.STRING
    },
    email : {
        type: Sequelize.STRING,
        validate : {
            isEmail : true
        }
    }
});
Profesor.hasMany(Test, {foreignKey: 'id_test', sourceKey: 'id_profesor',foreignKeyConstraint:true})

module.exports =  Profesor