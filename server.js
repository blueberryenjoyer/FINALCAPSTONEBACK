const express = require("express")
const app = express()
const PORT = 4343

const morgan = require("morgan");
app.use(morgan("dev"))

const cors = require("cors");
app.use(cors())

app.use(express.json())

// const client = require('./db/client')
// client.connect()

app.use('/api', require('./api'))


app.get("*", (_, res) => {
    res.status(404).send({
        name: "404 - not found",
        message: "The route you are looking for does not exist"
    })
})

app.listen(PORT, () => {
    console.log(`server is on port: ${PORT}`)
})
