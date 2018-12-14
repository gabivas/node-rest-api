const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


//Load Input Validation
const validateRegisterInput = require('../../validation/register')

const Student = require('../../models/Student')
const Teacher = require('../../models/Teacher')

// @route GET api/teachers/register
// @desc Tests users route
// access Public
router.post('/register',(req, res) => {
    const { errors, isValid} = validateRegisterInput(req.body)

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors)
    }

    Student.findOne({ where:{email: req.body.email}}).then(newStudent => {
        if (newStudent) {
            errors.email = 'Email already exists'
            return res.status(400).json(errors)
        }

        // let teacher =  Teacher.findOne({ where:{email: req.body.email}})
        // if (teacher) {
        //     errors.email = 'Email already exists'
        //     return res.status(400).json(errors)
        // }

        if (!newStudent) {

            newStudent = new Student({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                group : req.body.class,
                course: req.body.course
            })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newStudent.password, salt, (err, hash) => {
                if (err)
                    throw err
                newStudent.password = hash
                newStudent.save()
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
    Student.findOne({ where:{email: email}})
        .then(student => {


            // Check
            if (!student) {
                return res.status(404).json({email : 'Student not found'})
            }

            //Check password
            bcrypt.compare(password, student.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched

                        const payload = { student_id: student.student_id,
                            firstName: student.firstName, lastName: student.lastName, teacher: false} // Create jwt payload
                        //console.log(payload)
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

// @route GET api/students/current
// @desc Return current student
// access Private
router.get('/current', passport.authenticate('jwt', { session : false}), (req, res) => {
    res.json({
        student_id : req.user.student_id,
        firstName : req.user.firstName,
        lastName : req.user.lastName,
        email : req.user.email
    })
})

// @route GET api/students/:student_id
// @desc Return Student by Id
// access Private
router.get('/:student_id', passport.authenticate('jwt', { session : false}), (req, res) => {
    console.log(req.params)
    Student.findOne({student_id: req.params.student_id})
        .then(student => {
            return res.status(200).json(student)
    }).catch(err => res.status(404).json({nostudentfound: "No student found"}))
})

module.exports = router

