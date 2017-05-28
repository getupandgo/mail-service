const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define('Token', {
    token: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    count: Sequelize.INTEGER
  }, {
    classMethods: {
      associate: function (models) {

      }
    }
  })
}
