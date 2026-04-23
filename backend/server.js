const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Calorie Tacker API is running')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

