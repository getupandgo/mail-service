const app = require('./config/app')
const config = require('config')

const port = config.get('port')

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
