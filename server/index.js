const newrelic = require('newrelic')
const express = require('express')
const bodyParser = require('body-parser')
var app = express()
const port = 3000

const products = require('./router.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.send("Server Online")
})
app.use('/products', products)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})