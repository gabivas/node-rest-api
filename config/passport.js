const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Sequelize = require('sequelize')

const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = (passport)  =>  {
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
     //   console.log(jwtPayload.teacher)
        if (jwtPayload.teacher==true) {
            Teacher.findOne({where: {teacher_id: jwtPayload.teacher_id}})
                .then(teacher => {
                    if (teacher) {
                        //onsole.log(teacher)
                        return done(null, teacher)
                    }
                })
                .catch(err => console.log(err))
        }
        else if (jwtPayload.teacher==false) {
            Student.findOne({ where:{student_id: jwtPayload.student_id}})
                .then(student => {
                    if (student) {
                        console.log(student)
                        return done(null, student)
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            return done(null, false)
        }
    }))
}

