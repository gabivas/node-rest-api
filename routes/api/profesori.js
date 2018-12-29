const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


//Load Input Validation
const validateRegisterInput = require('../../validation/register')

const Profesor = require('../../models/Profesor')
const Student = require('../../models/Student')

// @route GET api/teachers/register
// @desc Tests users route
// access Public
router.post('/register',(req, res) => {
    const { errors, isValid} = validateRegisterInput(req.body)

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors)
    }

    Profesor.findOne({ where:{email: req.body.email}}).then( profesorNou => {
            if (profesorNou) {
                errors.email = 'Email already exists'
                return res.status(400).json(errors)
            }

        // let student =  Student.findOne({ where:{email: req.body.email}})
        // if (student) {
        //     errors.email = 'Email already exists'
        //     return res.status(400).json(errors)
        // }

        if (!profesorNou) {

                profesorNou = new Profesor({
                    nume: req.body.nume,
                    prenume: req.body.prenume,
                    parola: req.body.parola,
                    email: req.body.email
                })
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(profesorNou.password, salt, (err, hash) => {
                    if (err)
                        throw err
                    profesorNou.password = hash
                    profesorNou.save()
                        .then(profesor => res.json(profesor))
                        .catch((err) => console.log(err))
                })
            })
    })
 })

// @route GET api/teachers/login
// @desc Login User / Returning JWT Token
// access Public
router.post('/login', (req, res) => {
    const email = req.body.email
    const parola = req.body.parola

    // find user by email
    Profesor.findOne({ where:{email: email}})
        .then(profesor => {


            // Check
            if (!profesor) {
                return res.status(404).json({email : 'Profesor not found'})
            }

            //Check password
            bcrypt.compare(parola, profesor.parola)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched

                        const payload = { id_profesor: profesor.teacher_id,
                            nume: profesor.nume, prenume: profesor.prenume, teacher : true} // Create jwt payload

                        // Sign token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn : 3600}, (err, token) => {
                            res.json({ success : true, token : 'Bearer ' + token})
                        })

                    } else {
                        return res.status(400).json({ password : 'Password incorrect'})
                    }
                })
        })
})

// @route GET api/users/current
// @desc Return current user
// access Private
router.get('/current', passport.authenticate('jwt', { session : false}), (req, res) => {
    res.json({
         id_profesor : req.user.id_profesor,
         nume : req.user.nume,
         prenume : req.user.prenume,
         email : req.user.email
    })
})

module.exports = router