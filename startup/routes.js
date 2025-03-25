const auth = require('../routes/auth')
const user = require('../routes/users')
const post = require('../routes/posts')
const express = require('express')


module.exports = function(app) {
    app.use(express.json())
    app.use('/api/post',post)
    app.use('/api/user',user)
    app.use('/api/login',auth)
}