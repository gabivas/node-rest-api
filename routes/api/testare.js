const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

const Profesor = require('../../models/Profesor')
const sequelize =  require('../../config/db-connection').sequelize

router.post('/addProf', (req, res) => {


    profesorNou = new Profesor({
            nume: req.body.nume,
            prenume: req.body.prenume,
            parola: req.body.parola,
            email: req.body.email
        })
        profesorNou.save()
            .then(profesor => res.json(profesor))
            .catch((err) => console.log(err))

})

router.post('/addProfMat', (req, res) => {

    Profesor.findOne({ where:{id_profesor: 2}}).then(profesor => profesor.addMaterii(1))
        .then(profesor => res.json(profesor))



})

module.exports = router


