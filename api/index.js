const express = require('express')
const Router = express.Router()

Router.get('/', (req, res) => {
  res.send('the server works')
})



module.exports = Router