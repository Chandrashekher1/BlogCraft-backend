const uploadMultiple = require('../config/storage')
const auth = require('../middleware/auth')
const { Posts, validate } = require('../models/posts')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find()
        if (!posts.length) return res.status(404).send("No blogs available...");
        res.send(posts);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if (!post) return res.status(404).json({message: "Blog not found..."});
        res.send(post);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.get('/user/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        const posts = await Posts.find({ userId:userId });
        if (!posts.length) return res.status(404).json({ message: "No blogs found for this user." });
        res.send(posts);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
router.post('/', auth, uploadMultiple,async (req, res) => {
    try {
        const images = req.files?.map((image) => image.path)
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        
        let post = new Posts({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            image: images,
            userId: req.user ? req.user._id : null
        })
        post = await post.save()
        res.send(post)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.put('/:id', auth,uploadMultiple, async (req, res) => {
    try {
        const images = req.files?.map((image) => image.path)
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const post_update = await Posts.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                content: req.body.content,
                image: images
            },
            { new: true } 
        );

        if (!post_update) return res.status(404).send("Blog not found...");
        res.send(post_update);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

router.patch('/:id',auth, uploadMultiple, async (req, res) => {
    const images = req.files?.map((image) => image.path)
    try {
        const post_update = await Posts.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                content: req.body.content,
                image: images
            },
            { new: true } 
        )
        if (!post_update) return res.status(404).send("Blog not found...");
        res.send(post_update);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post_delete = await Posts.findByIdAndDelete(req.params.id);
        if (!post_delete) return res.status(404).send("Blog is unavailable with this ID.");
        res.send(post_delete);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;