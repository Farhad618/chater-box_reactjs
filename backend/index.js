const connectToMongo = require('./connection.js');
const express = require('express')
connectToMongo();

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// routes
app.use('/api/auth', require('./routes/auth'));


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})