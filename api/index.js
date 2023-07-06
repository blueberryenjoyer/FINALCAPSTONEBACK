const express = require('express')
const reviewsRouter = express.Router()

reviewsRouter.get('/health', (request, response) => {
  response.send('this is the api response')
})



module.exports = reviewsRouter