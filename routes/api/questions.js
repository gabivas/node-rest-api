const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


const Question = require('../../models/Question')

// router.post('/add', passport.authenticate('jwt', { session : false}), (req, res) => {
//
//     //trebuie validare
//
//     let newQuestion = new Question({
//         subject: req.body.subject,
//         description: req.body.description,
//         text: req.body.text,
//         difficulty: req.body.difficulty
//     })
//
//     newQuestion.save().catch(err => console.log(err))
//     res.status(200).json("Done")
// })


router.post('/', passport.authenticate('jwt', { session : false}), (req, res) => {

    //trebuie validare

    let newQuestion = new Question({
        subject: req.body.subject,
        description: req.body.description,
        text: req.body.text,
        difficulty: req.body.difficulty
    })

    newQuestion.save().catch(err => console.log(err))
    res.status(200).json("Done")
})


router.put('/:id', passport.authenticate('jwt', { session : false}),async (req, res) => {

    //trebuie validare

    try{
        let updatedQuestion = await Question.findById(req.params.id)
        if (updatedQuestion){
            await updatedQuestion.update(req.body)
            res.status(202).json({message : 'accepted'})
        }
        else{
            res.status(404).json({message : 'not found'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.delete('/:id', passport.authenticate('jwt', { session : false}),async (req, res) => {

    //trebuie validare

    try{
        let todeleteQuestion = await Question.findById(req.params.id)
        if (todeleteQuestion){
            await todeleteQuestion.destroy()
            res.status(202).json({message : 'accepted'})
        }
        else{
            res.status(404).json({message : 'not found'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

router.get('/:id'/*, passport.authenticate('jwt', { session : false})*/,async (req, res) => {

    //trebuie validare

    try{
        let question = await Question.findById(req.params.id)
        if (question){

            res.status(202).json({message : question})
        }
        else{
            res.status(404).json({message : 'not found'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})
router.get('/', passport.authenticate('jwt', { session : false}),async (req, res) => {

    //trebuie validare

    try{
        let questions = await Question.findAll()
        if (questions){

            res.status(202).json({message : questions})
        }
        else{
            res.status(404).json({message : 'not found'})
        }
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})



module.exports = router
