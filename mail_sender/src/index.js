const nodemailer = require('nodemailer')
const config = require('config')

const transporter = nodemailer.createTransport(config.get('smtp'))

module.exports.sendMail = function (message) {
  return randomDelay().then(() => transporter.sendMail(message))
}

const randomDelay = function () {
  return new Promise(resolve => {
    setTimeout(() => resolve(), Math.random() * 3)
  })
}
