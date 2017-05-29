const init = require('./config/app')
const config = require('config')

const port = config.get('port')

init()
    .then(app => {
      app.listen(port, () => {
        console.log(`Listening on ${port}`)
      })
    })
    .catch(err => console.error(err))
