const {uploadSingle} = require('../config/storage')
const auth = require('../middleware/auth') 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Users,validate} = require('../models/users')
const express = require('express')
const router = express.Router()

router.get('/me',[auth], async (req,res) => {
    const user = await Users.findById(req.user._id).select('-password')
    res.send(user)
})

router.get('/:id',[auth], async (req,res) => {
    const user = await Users.findById(req.params.id).select('-password')
    res.send(user)
})

router.post('/', uploadSingle, async (req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let user = await Users.findOne({email:req.body.email})
    if(user) {
        return res.status(400).json({ message: "User is already exists" });
    }
    const images = req.file?.path
    user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: images
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(req.body.password,salt)
    user = await user.save()
    const token = user.generateAuthToken()    
    res.header('Authorization',token).json({ message: "User registered Successfully", token }).send(user)
})

router.put('/:id', uploadSingle, auth, async(req,res) => {
    try{
        const images = req.file?.path
        const user = await Users.findByIdAndUpdate(
            req.params.id,
            {
                name : req.body.name,
                email: req.body.email,
                image: images
            },
            {new : true}
        ).select('-password')
        if(!user) return res.status(404).json({message: "User not found"})
        res.send(user)
    }
    catch(error) {
        res.status(400).json({message: "Internal error"})
    }
})

router.patch('/:id', uploadSingle, auth, async(req,res) => {
    try{
        const images = req.file?.path
        const user = await Users.findByIdAndUpdate(
            req.params.id,
            {
                name : req.body.name,
                email: req.body.email,
                image: images
            },
            {new : true}
        ).select('-password')
        if(!user) return res.status(404).json({message: "User not found"})
        res.send(user)
    }
    catch(error) {
        res.status(400).json({message: "Internal error"})
    }
})

module.exports = router