const sender = require('./src/index')

const message = {
  from: 'sender@mailservice.com',
  to: 'receiver@example.com',
  subject: 'Message title',
  text: 'Plaintext version of the message'
}

sender.sendMail(message)
