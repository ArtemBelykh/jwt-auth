require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = process.env.PORT || 3000

const errorMiddleware = require('./Middleware/error.middleware')
const router = require('./routes/index')

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  credentials: true,
  origin: true
}));

app.options('*', cors()) // include before other routes
// app.use(cors({ credentials: true, origin: true }))
// app.use(cors()) // Use this after the variable declaration  {credentials: true, origin: 'http://localhost:3000'}
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()