const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB!'))
.catch((err) => console.log('Error connecting to MongoDB', err))
app.get('/', (req, res) => {
  res.send('Calorie Tacker API is running')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

