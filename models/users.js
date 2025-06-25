const jwt = require('jsonwebtoken')
const Joi = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        lowercase:true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        validate: function(value){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: 'Invalid email format'
    },
    password: {
        type: String,
        required: true,
        minlength:5,
        maxlength:1024
    },
    image: {
        type : String
    },
    isAdmin: Boolean
})
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.post_jwtPrivateKey)
    return token
}

const userModel = mongoose.model('users',userSchema)

function validateProduct(user){
    const Schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().min(0).max(2000).required(),
        password: Joi.string().required()
    })

    return Schema.validate(user)
}

module.exports.Users = userModel
module.exports.validate = validateProduct