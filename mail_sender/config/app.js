const amqp = require('amqplib')
const config = require('config')

const sender = require('../src/index')

const fromAddr = config.get('senderAddr')

module.exports = async function () {
  const connection = await amqp.connect(config.get('amqp'))
  const channel = await connection.createChannel()

  await channel.assertQueue('send_email')

  channel.consume('send_email', msg => {
    if (msg) {
      const email = JSON.parse(msg.content.toString())
      email.from = fromAddr

      sender.sendMail(message)

      channel.ack(msg)
    } else {
      console.error('No message provided')
    }
  })
}
