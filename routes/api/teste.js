const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


const Test = require('../../models/Test')

router.post('/', passport.authenticate('jwt', { session : false}), (req, res) => {

    //trebuie validare

    let testNou = new Test({
        nume: req.body.nume,
        descriere: req.body.descriere,
        timp_disponibil: req.timp_disponibil,
        este_public: req.body.este_public,
        id_materie: req.body.id_materie
    })

    testNou.save().catch(err => console.log(err))
    res.status(200).json("Done")
})

module.exports = router

