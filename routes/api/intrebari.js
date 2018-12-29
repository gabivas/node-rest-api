const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


const Intrebare = require('../../models/Intrebare')

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

    let intrebareNoua = new Intrebare({
        text: req.body.text,
        tema: req.body.tema,
        dificultate: req.body.dificultate,
        timp_maxim_raspuns: req.body.timp_maxim_raspuns,
        id_materie: req.body.id_materie,
        id_profesor: req_body.id_profesor
    })

    intrebareNoua.save().catch(err => console.log(err))
    res.status(200).json("Done")
})


router.put('/:id', passport.authenticate('jwt', { session : false}),async (req, res) => {

    //trebuie validare

    try{
        let intrebareDeModificat = await Intrebare.findById(req.params.id)
        if (intrebareDeModificat){
            await intrebareDeModificat.update(req.body)
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
        let intrebareDeSters = await Question.findById(req.params.id)
        if (intrebareDeSters){
            await intrebareDeSters.destroy()
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
        let intrebare = await Intrebare.findById(req.params.id)
        if (intrebare){

            res.status(202).json({message : intrebare})
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
        let intrebari = await Intrebare.findAll()
        if (intrebari){

            res.status(202).json({message : intrebari})
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
