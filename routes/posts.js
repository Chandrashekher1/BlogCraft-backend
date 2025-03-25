const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const {Posts } = require('../models/posts')
const express = require('express')
const router = express.Router()

router.get('/', async (req,res) => {
    const post = await Posts.find()
    if(!post) return res.send("Not any blog available...")
    res.send(post)
})

router.get('/:id',auth, async (req,res) => {
    const post = await Posts.findById(req.params.id)
    if(!post) return res.send("Not any blog available...")
    res.send(post)
})

router.post('/',[auth,admin], async (req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let post = new Posts({
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
        tags:req.body.tags,
        media:req.body.media
    })

    post = await post.save()
    res.send(post)
})

router.put('/:id',[auth,admin], async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const post_update = await Posts.findByIdAndUpdate(req.params.id,
        {
            title:req.body.title,
            author:req.body.author,
            content:req.body.content,
            tags:req.body.tags,
            media:req.body.media
        }
    )
    res.send(post_update)
})

router.delete('/:id',[auth,admin], async (req,res) => {
    const post_delete = await Posts.findByIdAndDelete(req.params.id)
    if(!post_delete) return res.status(400).send("Blog is unavailable with this ID.")

    res.send(post_delete)
})
module.exports = router