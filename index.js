const express = require('express')


const app = express()
const port = 3333
const router = require('./routes/index')
const cors = require('cors');
const dotenv =require('dotenv')

dotenv.config();
app.use(cors());



app.use(express.json())
app.use(router)

//protected route using the verifyToken middleware




// GET, POST, PUT, PATCH, DELETE
app.get('/', (req,res) => {
    res.json({
        meesage: "hallo"
    })
    res.send("Nice")
})

app.listen(port, () => console.log(`server running on port ${port}`))

