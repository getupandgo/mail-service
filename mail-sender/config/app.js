const amqp = require('amqplib')
const config = require('config')

const sender = require('../src/index')

const message = {
  from: 'sender@mailservice.com',
  to: 'receiver@example.com',
  subject: 'Sample message',
}

module.exports = async function () {
  const connection = await amqp.connect(config.get('amqp'))
  const channel = await connection.createChannel()

  await channel.assertQueue('send_email')

  channel.consume('send_email', msg => {
    if (msg) {
      message.text = msg.content.toString()
      sender.sendMail(message)

      channel.ack(msg)
    }
  })
}
