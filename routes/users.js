const {uploadSingle} = require('../config/storage')
const auth = require('../middleware/auth') 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Users,validate} = require('../models/users')
const express = require('express')
const router = express.Router()

router.get('/me',[auth], async (req,res) => {
    try {
        const user = await Users.findById(req.user._id).select('-password');
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch profile", error: err.message });
    }
})

router.get('/:id',[auth], async (req,res) => {
    try{
        const user = await Users.findById(req.params.id).select('-password')
        res.send(user)
    } catch(err){
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
})

router.post('/', uploadSingle, async (req,res) => {
try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    let user = await Users.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ success: false, message: "User already exists" });

    const image = req.file?.path;
    if(!image) {
        return res.status(500).json({success:false, message: "profile image required"})
    }
    user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user = await user.save();
    const token = user.generateAuthToken();
    

    res.status(201)
    .header('Authorization',token)
    .json({
      success: true,
      message: "User registered successfully",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed", error: err.message });
  }
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
        res.status(500).json({message: "Internal error",error: error.message})
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
        res.status(500).json({message: "Internal error", error: error.message})
    }
})

module.exports = router