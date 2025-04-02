const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require('joi-objectid')(Joi)


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
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
    ref: 'Users', 
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  media: {
    url: { type: String },
    type: { type: String, enum: ["image", "video", "none"], default: "none" },
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
    tags: Joi.array().items(Joi.string()).required(),
    media: Joi.object({
      url: Joi.string().uri().optional(),
      type: Joi.string().valid("image", "video", "none").optional(),
    }).optional(),
    userId: JoiObjectId().optional()
  });

  return Schema.validate(post);
}

const PostModel = mongoose.model("Post", postSchema);

module.exports.validate = postValidate;
module.exports.Posts = PostModel;
