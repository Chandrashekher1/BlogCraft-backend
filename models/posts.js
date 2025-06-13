const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require('joi-objectid')(Joi)

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // trim: true,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users', 
    required: true,
  },
  image: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Validation Function
function postValidate(post) { 
  const Schema = Joi.object({ 
    title: Joi.string().min(1).max(200).required(),
    content: Joi.string().required(),
    author: Joi.string().required(),
    userId: JoiObjectId().optional()
  });

  return Schema.validate(post);
}

const PostModel = mongoose.model("Post", postSchema);

module.exports.validate = postValidate;
module.exports.Posts = PostModel;