const {Users,validate} = require('../models/users')
const express = require('express')
const router = express.Router()

router.post('/', async (req,res) => {
    const {name,email, password} = req.body
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

})