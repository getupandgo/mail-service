const express = require('express')

module.exports = function (channel) {
  const router = express.Router()

  router.get('/tokens', (req, res) => {
    channel.sendToQueue('req_tokens', Buffer.from('send'))

    channel.consume('res_tokens', msg => {
      if (msg) {
        res.send(msg.content.toString())
        channel.ack(msg)
      }
    })
  })

  router.post('/message', (req, res) => {
    channel.sendToQueue('send_email', req.body)
    channel.sendToQueue('update_tokens', req.body)

    res.sendStatus(200)
  })

  return router
}
