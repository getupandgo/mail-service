const express = require('express')
const amqp = require('amqplib')
const config = require('config')
const bodyParser = require('body-parser')

const index = require('../routes/index')

module.exports = async function () {
  const connection = await amqp.connect(config.get('amqp'))
  const channel = await connection.createChannel()

  await channel.assertQueue('send_email')
  await channel.assertQueue('update_tokens')
  await channel.assertQueue('req_tokens')
  await channel.assertQueue('res_tokens')

  const app = express()
  app.use(bodyParser.json())
  app.use('/', index(channel))

  return app
}
