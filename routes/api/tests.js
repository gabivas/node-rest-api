const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


const Test = require('../../models/Test')

router.post('/', passport.authenticate('jwt', { session : false}), (req, res) => {

    //trebuie validare

    let newTest = new Test({
        subject: req.body.subject,
        description: req.body.description,
        text: req.body.text,
        difficulty: req.body.difficulty
    })

    newQuestion.save().catch(err => console.log(err))
    res.status(200).json("Done")
})

module.exports = router

