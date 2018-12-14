const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


//Load Input Validation
const validateRegisterInput = require('../../validation/register')

const Teacher = require('../../models/Teacher')
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

    Teacher.findOne({ where:{email: req.body.email}}).then( newTeacher => {
        if (newTeacher) {
            errors.email = 'Email already exists'
            return res.status(400).json(errors)
        }

        // let student =  Student.findOne({ where:{email: req.body.email}})
        // if (student) {
        //     errors.email = 'Email already exists'
        //     return res.status(400).json(errors)
        // }

        if (!newTeacher) {

                newTeacher = new Teacher({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                })
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newTeacher.password, salt, (err, hash) => {
                    if (err)
                        throw err
                    newTeacher.password = hash
                    newTeacher.save()
                        .then(teacher => res.json(teacher))
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
    const password = req.body.password

    // find user by email
    Teacher.findOne({ where:{email: email}})
        .then(teacher => {


            // Check
            if (!teacher) {
                return res.status(404).json({email : 'Teacher not found'})
            }

            //Check password
            bcrypt.compare(password, teacher.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched

                        const payload = { teacher_id: teacher.teacher_id,
                            firstName: teacher.firstName, lastName: teacher.lastName, teacher : true} // Create jwt payload

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
         teacher_id : req.user.teacher_id,
         firstName : req.user.firstName,
         lastName : req.user.lastName,
         email : req.user.email
    })
})

module.exports = router