'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const Sequelize = require('sequelize')

const database = require('./routes/database/database')
const teachers = require('./routes/api/profesori')
const students = require('./routes/api/studenti')
const tests = require('./routes/api/teste')
const questions = require('./routes/api/intrebari')
//const results = require('./routes/api/results')

const testare = require('./routes/api/testare')
require('./models/tabeleLegatura')()

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())


// Passport middleware

app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Use Routes
app.use('/database', database)
app.use('/api/teachers', teachers)
app.use('/api/students', students)
//app.use('/api/tests', tests)
app.use('/api/questions', questions)

const port = process.env.PORT || 8080

app.use('/api/testare', testare)

app.listen(port, () => console.log(`Server running on port ${port}`))