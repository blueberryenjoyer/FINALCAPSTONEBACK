const express = require("express")
const app = express()
const PORT = 4343

const morgan = require("morgan");
app.use(morgan("dev"))

const cors = require("cors");
app.use(cors())

app.use(express.json())

const client = require('./db/client')
client.connect()

app.use('/api', require('./api'))

app.listen(PORT, () => {
    console.log(`server is on port: ${PORT}`)
})
