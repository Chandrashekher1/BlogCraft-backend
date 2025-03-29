const Joi = require('joi')
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim: true,
        maxlength: 200
    },
    content: {
        type:String, 
        required: true
    },
    author: {
        type: String,
        required:true
    },
    date : {
        type: Date, 
        default: Date.now()
    },
    tags : [{
        type: String,
        trim:true
    }],
    media:{
        url: {type:String},
        type: {type:String, enum: ['image','video','none'],default: 'none'}
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    updatedAt: {
        type:Date,
        default: Date.now()
    }
})

function postValidate(post){
    const Schema = Joi.object({
        title: Joi.string().min(0).max(200).required(),
        content: Joi.string().required(),
        author: Joi.string().required(),
        tags: Joi.string().required(),
        media:Joi.string().uri().required()
    })

    return Schema.validate(post)
}
const postModel = mongoose.model('post',postSchema)

module.exports.validate = postValidate
module.exports.Posts = postModel