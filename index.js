const express = require('express')

const app = express()
const port = 3333
const router = require('./routes/index')
const cors = require('cors');
const multer = require('multer')
const dotenv =require('dotenv')
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file

dotenv.config();
app.use(cors());



app.use(express.json())
app.use(router)

//protected route using the verifyToken middleware


// app.use((req, res, next) => {
//     // Log request headers
//     console.log('Request Headers:', req.headers);
//     req.user = userData;
//     next();
// });


// GET, POST, PUT, PATCH, DELETE
app.get('/', (req,res) => {
    res.json({
        meesage: "hallo"
    })
    res.send("Nice")
})

app.listen(port, () => console.log(`server running on port ${port}`))

