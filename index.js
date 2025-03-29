const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(cors({
    origin: '*', 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    exposedHeaders: ["Authorization"],
    credentials: true 
}));

require('./startup/routes')(app); 

if (!process.env.post_jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect(process.env.mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB is connected..."))
    .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
