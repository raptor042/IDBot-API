import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import multer from "multer"
import { storeNFTs } from "./controllers/index.js"
import { config } from "dotenv"
import { createIDBotDID } from "./__web3__/index.js"

config()

const { PORT } = process.env

const app = express()

app.use(cors())
app.use(bodyParser.json())

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename : (req, file, cb) => {
        cb(null, `${file.fieldname}.png`)
    }
})

const upload = multer({ storage })

const fields = [
    { name : "pic", maxCount : 1 },
    { name : "id", maxCount : 1 }
]

app.post("/profile", upload.fields(fields), async (req, res) => {
    console.log(req.body, req.files)
    const nfts = await storeNFTs(
        [
            {
                imagePath : "uploads/pic.png",
                name : `Profile Picture by ${req.body.name}`,
                description : req.body.description
            },
            {
                imagePath : "uploads/id.png",
                name : `Means of Identity for ${req.body.name}`,
                description : req.body.description
            }
        ]
    )
    await createIDBotDID(req.body, nfts[0].url)

    return res.json({ nfts })
})

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Connection at ${PORT} is successful.`)
})