const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')

const sequelize =  require('../../config/db-connection').sequelize

router.get('/createDatabase', async (req, res) => {
    try{
        await sequelize.sync({force : true})
        res.status(201).json({message : 'database created'})
    }
    catch(e){
        console.warn(e)
        res.status(500).json({message : 'server error'})
    }
})

module.exports = router