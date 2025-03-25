const bcrypt = require('bcrypt')
const {Users} = require('../models/users')
const Joi = require('joi')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await Users.findOne({email: req.body.email})
    if(!user) return res.status(400).send("User is not register")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send("Invalid Password")

    const token = user.generateAuthToken()
    res.send(token)
})

function validate(user){
    const Schema = Joi.object({
        email: Joi.string().min(0).max(2000).required(),
        password: Joi.number().required(),
    })
   return Schema.validate(user);
}

module.exports = router