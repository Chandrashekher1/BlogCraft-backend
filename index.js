const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config();
require('./startup/routes')(app)

if(!process.env.post_jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/Blog')
    .then(() => console.log("mongodb is connected..."))
    .catch((err) => console.log(err.message))

const PORT = 3000

app.listen(PORT, console.log(`listening to port ${PORT}...`))