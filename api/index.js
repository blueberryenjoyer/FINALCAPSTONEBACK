const express = require('express')
const Router = express.Router()


Router.get('/test', (req, res) => {
  res.send('the server works')
})



module.exports = Router