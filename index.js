const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config();
require('./startup/routes')(app)

if(!process.env.post_jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}

app.use(cors({
    origin:"http://localhost:5173/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}))

mongoose.connect(process.env.mongodb_uri)
    .then(() => console.log("mongodb is connected..."))
    .catch((err) => console.log(err.message))


app.listen(process.env.PORT, console.log(`listening to port ${process.env.PORT}...`))