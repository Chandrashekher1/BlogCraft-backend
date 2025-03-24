const Joi = require('joi')
const { required } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose({
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
    isAdmin: true
})

const userModel = mongoose.model('users',userSchema)

function validateProduct(user){
    const Schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(0).max(2000).required(),
        password: Joi.string().required()
    })

    return Schema.validate(Schema)
}

module.exports = userModel
module.exports = validateProduct