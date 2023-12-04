import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { createIDBotDID } from "./controllers"

const {  PORT } = process.env

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post("/create", async (req, res) => {
    const DID = createIDBotDID(req.body)
    console.log("DID", DID)

    return res.json({ ...DID })
})

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Connection at ${PORT} is successful.`)
})