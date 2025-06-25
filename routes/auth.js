const bcrypt = require('bcrypt')
const {Users} = require('../models/users')
const Joi = require('joi')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    try{
        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        let user = await Users.findOne({email: req.body.email})
        if(!user) return res.status(400).json({ message: "User is not registered" });

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).json({ message: "Invalid Password" });

        const token = user.generateAuthToken()
        res.header('Authorization',token).send(user)
    } catch(err){
        console.error("Login error",err)
        res.status(500).json({success: false, message: "Internal server error ", error: err.message})
    }
})

function validate(user){
    const Schema = Joi.object({
        email: Joi.string().email().min(0).max(2000).required(),
        password: Joi.string().required(),
    })
   return Schema.validate(user);
}

module.exports = router