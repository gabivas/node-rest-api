const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

let validTokens = []

//Load Input Validation
const validateRegisterInput = require('../../validation/register')

const Student = require('../../models/Student')
const Profesor = require('../../models/Profesor')

// @route GET api/teachers/register
// @desc Tests users route
// access Public
router.post('/register',(req, res) => {
    const { errors, isValid} = validateRegisterInput(req.body)

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors)
    }

    Student.findOne({ where:{email: req.body.email}}).then(studentNou => {
        if (studentNou) {
            errors.email = 'Email already exists'
            return res.status(400).json(errors)
        }

        // let teacher =  Profesor.findOne({ where:{email: req.body.email}})
        // if (teacher) {
        //     errors.email = 'Email already exists'
        //     return res.status(400).json(errors)
        // }

        if (!studentNou) {

            studentNou = new Student({
                nume: req.body.nume,
                prenume: req.body.prenume,
                parola: req.body.parola,
                email: req.body.email
            })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(studentNou.password, salt, (err, hash) => {
                if (err)
                    throw err
                studentNou.password = hash
                studentNou.save()
                    .then(student => res.json(student))
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
    Student.findOne({ where:{email: email}})
        .then(student => {


            // Check
            if (!student) {
                return res.status(404).json({email : 'Student not found'})
            }

            if (validTokens.some(entry => entry.email === email)) {
                activeToken = validTokens.filter(entry => entry.email === email).token
                jwt.verify(activeToken, keys.secretOrKey, (err, decoded) => {
                    if (err) {
                        return res.status(403).json({message : 'You are already logged in'})
                    }
                });
            }

            //Check password
            bcrypt.compare(password, student.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched

                        const payload = { id_student: student.id_student,
                            nume: student.nume, prenume: student.prenume, teacher: false} // Create jwt payload
                        //console.log(payload)
                        // Sign token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn : 3600}, (err, token) => {
                            validTokens.push({email, token})
                            res.json({ success : true, token : 'Bearer ' + token})
                        })

                    } else {
                        return res.status(400).json({ password : 'Password incorrect'})
                    }
                })
        })
})

// @route GET api/students/current
// @desc Return current student
// access Private
router.post('/logout', passport.authenticate('jwt', { session : false}), (req, res) => {
    if (validTokens.some(entry => entry.email === req.body.email)){

        validTokens = validTokens.filter(entry => entry.email !== req.body.email)

        res.json({
            email: 'You have successfully logged out'
        })
    }
    else {
        res.render('/login')
    }
})

// @route GET api/students/current
// @desc Return current student
// access Private
router.get('/current', passport.authenticate('jwt', { session : false}), (req, res) => {
    res.json({
        id_student: req.user.id_student,
        nume : req.user.nume,
        prenume : req.user.prenume,
        email : req.user.email
    })
})

// @route GET api/students/:student_id
// @desc Return Student by Id
// access Private
router.get('/:student_id', passport.authenticate('jwt', { session : false}), (req, res) => {
    console.log(req.params)
    Student.findOne({id_student: req.params.id_student})
        .then(student => {
            return res.status(200).json(student)
    }).catch(err => res.status(404).json({nostudentfound: "No student found"}))
})

module.exports = router

