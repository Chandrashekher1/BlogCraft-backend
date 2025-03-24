const post = require('../routes/posts')
const express = require('express')


module.exports = function(app) {
    app.use(express.json())
    app.use('/api/post',post)
}