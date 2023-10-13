const express = require('express')
const app = express()
const port = 3333

app.get('/', (req,res) => {
    res.send("Nice")
})

app.listen(port, () => console.log(`server running on port ${port}`))