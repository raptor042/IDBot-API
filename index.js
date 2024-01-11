import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { decrypt, decryptPassord, encrypt, encryptPassword } from "./controllers/index.js"
import { config } from "dotenv"
import {
    getAge,
    getAddress,
    getCountry,
    getDescription,
    getEmail,
    getName,
    getPhone,
    getProfilePic, 
    getProjects, 
    getScore, 
    getState, 
    unsubscribe, 
    unverifyIDBotProfile, 
    verifyIDBotProfile,
    getIDBotNumber,
    getUser,
} from "./__web3__/index.js"
import { addAdmin, connectDB, getAdmin } from "./__db__/index.js"

config()

const { PORT } = process.env

connectDB()

setInterval(unsubscribe, 1000*60*60*24)

const app = express()

app.use(cors())
app.use(bodyParser.json())

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

app.post("/encrypt", (req, res) => {
    const encryptedText = encrypt(req.body.text)
    console.log(req.body.text, encryptedText)

    encryptedText ? res.status(200).send(encryptedText) : res.status(400).send("Encryption failed")
})

app.post("/decrypt", (req, res) => {
    const decryptedText = decrypt(req.body.text)
    console.log(req.body.text, decryptedText)

    decryptedText ? res.status(200).send(decryptedText) : res.status(400).send("Decryption failed")
})

app.get("/verify/:profile", async (req, res) => {
    const verify = await verifyIDBotProfile(req.params.profile)
})

app.get("/unverify/:profile", async (req, res) => {
    const unverify = await unverifyIDBotProfile(req.params.profile)
})

app.get("/user/:profile", async (req, res) => {
    const user = await getUser(req.params.profile)

    return res.status(200).send(user)
})

app.get("/number/:profile", async (req, res) => {
    const idbot_number = await getIDBotNumber(req.params.profile)

    return res.status(200).send(idbot_number)
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