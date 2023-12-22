import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import multer from "multer"
import { storeNFTs } from "./controllers/index.js"
import { config } from "dotenv"
import { createIDBotDID, unverifyIDBotProfile, verifyIDBotProfile } from "./__web3__/index.js"
import { addAdmin, connectDB, getAdmin } from "./__db__/index.js"

config()

const { PORT } = process.env

connectDB()

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
    await createIDBotDID(req.body, nfts)

    return res.json({ nfts })
})

app.post("/signup", async (req, res) => {
    const admin = await addAdmin(
        req.body.username,
        req.body.password,
        req.body.address
    )

    return res.status(200).json({ ...admin })
})

app.post("/login", async (req, res) => {
    const admin = await getAdmin(req.body.address)
    console.log(req.body)

    req.body.password == admin.password ? res.status(200).send("Successful") : res.status(400).send("Failed")
})

app.get("/verify/:profile", async (req, res) => {
    const verify = await verifyIDBotProfile(req.params.profile)    
})

app.get("/unverify/:profile", async (req, res) => {
    const unverify = await unverifyIDBotProfile(req.params.profile)
})

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Connection at ${PORT} is successful.`)
})