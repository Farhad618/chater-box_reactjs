const dotenv = require('dotenv')
dotenv.config({ path: './config.env'})

const connectToMongo = require('./connection.js');
const express = require('express')
connectToMongo();
const port = process.env.PORT
const app = express()


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!\nWelcome to chater-box!')
})

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})