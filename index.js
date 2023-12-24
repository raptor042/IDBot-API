import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import multer from "multer"
import { decryptPassord, encryptPassword, storeNFTs } from "./controllers/index.js"
import { config } from "dotenv"
import { 
    createIDBotDID,
    getAge,
    getAddress,
    getCountry,
    getDescription,
    getEmail,
    getName,
    getPhone,
    getProfileAddressI, 
    getProfileAddressII, 
    getProfilePic, 
    getProjects, 
    getScore, 
    getState, 
    unsubscribe, 
    unverifyIDBotProfile, 
    verifyIDBotProfile,
} from "./__web3__/index.js"
import { addAdmin, connectDB, getAdmin } from "./__db__/index.js"

config()

const { PORT } = process.env

connectDB()

setInterval(unsubscribe, 1000*60*60*24)

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
    const password = await encryptPassword(req.body.password)
    const admin = await addAdmin(
        req.body.username,
        password,
        req.body.address
    )

    return res.status(200).json({ ...admin })
})

app.post("/login", async (req, res) => {
    const admin = await getAdmin(req.body.address)
    console.log(req.body)
    const password = await decryptPassord(
        req.body.password, 
        admin.password
    )

    password ? res.status(200).send("Successful") : res.status(400).send("Failed")
})

app.get("/verify/:profile", async (req, res) => {
    const verify = await verifyIDBotProfile(req.params.profile)
})

app.get("/unverify/:profile", async (req, res) => {
    const unverify = await unverifyIDBotProfile(req.params.profile)
})

app.get("/profileI/:address", async (req, res) => {
    const profile = await getProfileAddressI(req.params.address)

    return res.status(200).send(profile)
})

app.get("/profileII/:number", async (req, res) => {
    const profile = await getProfileAddressII(req.params.number)

    return res.status(200).send(profile)
})

app.get("/name/:profile", async (req, res) => {
    const name = await getName(req.params.profile)

    return res.status(200).send(name)
})

app.get("/description/:profile", async (req, res) => {
    const description = await getDescription(req.params.profile)

    return res.status(200).send(description)
})

app.get("/email/:profile", async (req, res) => {
    const email = await getEmail(req.params.profile)

    return res.status(200).send(email)
})

app.get("/age/:profile", async (req, res) => {
    const age = await getAge(req.params.profile)

    return res.status(200).send(age)
})

app.get("/country/:profile", async (req, res) => {
    const country = await getCountry(req.params.profile)

    return res.status(200).send(country)
})

app.get("/state/:profile", async (req, res) => {
    const state = await getState(req.params.profile)

    return res.status(200).send(state)
})

app.get("/phone/:profile", async (req, res) => {
    const phone = await getPhone(req.params.profile)

    return res.status(200).send(phone)
})

app.get("/address/:profile", async (req, res) => {
    const address = await getAddress(req.params.profile)

    return res.status(200).send(address)
})

app.get("/profile_pic/:profile", async (req, res) => {
    const profile_pic = await getProfilePic(req.params.profile)

    return res.status(200).send(profile_pic)
})

app.get("/score/:profile", async (req, res) => {
    const score = await getScore(req.params.profile)

    return res.status(200).send(`${score}`)
})

app.get("/projects/:profile", async (req, res) => {
    const projects = await getProjects(req.params.profile)

    return res.status(200).json({ projects })
})

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Connection at ${PORT} is successful.`)
})