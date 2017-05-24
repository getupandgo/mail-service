const express = require('express')

const router = express.Router()

router.get('/tokens', (req, res) => {
  res.sendStatus(200)
})

router.post('/message', (req, res) => {
  res.sendStatus(200)
})

module.exports = router
