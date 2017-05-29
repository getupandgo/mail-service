const express = require('express')

module.exports = function (channel) {
  const router = express.Router()

  router.get('/tokens', async (req, res) => {
    channel.sendToQueue('req_tokens', Buffer.from('send'))

    const content = await getResponse(channel)
    res.send(content)
  })

  router.post('/message', (req, res) => {
    channel.sendToQueue('send_email', req.body)
    channel.sendToQueue('update_tokens', req.body)

    return res.sendStatus(200)
  })

  return router
}

const getResponse = function (channel) {
  return new Promise((resolve, reject) => {
    channel.consume('res_tokens', msg => {
      if (msg) {
        const content = msg.content.toString()
        channel.ack(msg)
        resolve(content)
      } else { reject() }
    })
  })
}
