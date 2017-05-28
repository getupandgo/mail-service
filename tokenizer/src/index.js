const countBy = require('lodash.countby')
const differenceWith = require('lodash.differencewith')
const uniq = require('lodash.uniq')

const Token = require('../models').Token

module.exports.updateTokenFrequency = function (body) {
  let splittedText = body.match(/[a-z'\-]+/gi)
  const tokenFrequency = countBy(splittedText)

  splittedText = uniq(splittedText, 'token')

  return Token.findAll({
    attributes: ['token', 'count'],
    where: {
      token: {
        $in: splittedText
      }
    }
  })
  .then(tokensToUpdate => {
    const updatePromise = Promise.all(
      tokensToUpdate.map(token => {
        return token.update({
            count: token.count + tokenFrequency[token.token]
        })
      })
    )

    const newTokens = differenceWith(splittedText, tokensToUpdate, (textTokenVal, tokenToUpdateVal) => {
      return textTokenVal === tokenToUpdateVal.token
    })

    const newRecords = newTokens.map(token => {
      return {token, count: tokenFrequency[token]}
    })

    const createPromise = Token.bulkCreate(newRecords)

    return Promise.all([updatePromise, createPromise])
  })
}

module.exports.getCommonTokens = function () {
  return Token.findAll({
    order: 'count',
    limit: 10
  })
}
