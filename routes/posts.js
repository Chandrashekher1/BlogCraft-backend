const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { Posts, validate } = require('../models/posts');
const express = require('express');
const router = express.Router();

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
        if (!post) return res.status(404).send("Blog not found...");
        res.send(post);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let post = new Posts({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            // tags: req.body.tags,
            media: typeof req.body.media === 'object' ? req.body.media : {}, 
            userId: req.user ? req.user._id : null
        });

        post = await post.save();
        res.send(post);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const post_update = await Posts.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                content: req.body.content,
                tags: req.body.tags,
                media: typeof req.body.media === 'object' ? req.body.media : {}
            },
            { new: true } 
        );

        if (!post_update) return res.status(404).send("Blog not found...");
        res.send(post_update);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

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
