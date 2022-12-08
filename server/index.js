import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const app = express()
const port = process.env.ENV_PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})