const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define('token_count', {
    token: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    count: Sequelize.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {

      }
    }
  })
}
