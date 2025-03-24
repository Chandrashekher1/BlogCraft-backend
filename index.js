const mongoose = require('mongoose')
const express = require('express')
const app = express()

require('./startup/routes')(app)

mongoose.connect('mongodb://localhost/Blog')
    .then(() => console.log("mongodb is connected..."))
    .catch((err) => console.log(err.message))

const PORT = 3000

app.listen(PORT, console.log(`listening to port ${PORT}...`))