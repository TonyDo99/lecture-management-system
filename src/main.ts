import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import './models/connection'
import './models/schema'
import userRouter from './routers/user.route'
// import { errorHandler } from './utils/error'
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use(express.json())
// app.use(errorHandler)

app.use('/api/user', userRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
