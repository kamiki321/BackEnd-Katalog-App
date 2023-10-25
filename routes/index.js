const router = require('express').Router()
const usersRouter = require('./usersRouter')

router.use("/api/v1", usersRouter) //user router endpoint

module.exports = router