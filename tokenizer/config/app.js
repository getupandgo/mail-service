const amqp = require('amqplib')
const config = require('config')

const tokenizer = require('../src/index')

module.exports = async function () {
  const connection = await amqp.connect(config.get('amqp'))
  const channel = await connection.createChannel()

  await channel.assertQueue('update_tokens')
  await channel.assertQueue('req_tokens')
  await channel.assertQueue('res_tokens')

  channel.consume('update_tokens', msg => {
    if (msg) {
      const emailText = msg.content.toString()
      tokenizer.updateTokenFrequency(emailText)
      channel.ack(msg)
    }
  })

  channel.consume('req_tokens', msg => {
    if (msg) {
      tokenizer.getCommonTokens().then(topTokens => {
        channel.sendToQueue('res_tokens', Buffer.from(JSON.stringify(topTokens)))
        channel.ack(msg)
      })
    }
  })
}
