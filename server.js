import express from 'express'
import path from 'path'

const app = express()
const __dirname = path.resolve()

const port = process.env.PORT || 8080
app.use('/', express.static(__dirname + '/dist'))
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})
app.listen(port, function () {
  console.log('Express started on ', port)
})
