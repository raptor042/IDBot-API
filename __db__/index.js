import { connect } from "mongoose"
import dotenv from "dotenv"
import { AdminModel } from "./models/index.js"

const { config } = dotenv

config()

const URI = process.env.MONGO_URI

export const connectDB = async () => {
    try {
        await connect(`${URI}`)
        console.log("Connection to the Database was successful.")
    } catch(err) {
        console.log(err)
    }
}

export const addAdmin = async (username, password, address) => {
    try {
        const admin = new AdminModel({
            username,
            password,
            address
        })

        const data = await admin.save()

        return data
    } catch (err) {
        console.log(err)
    }
}

export const getAdmin = async (address) => {
    try {
        const admin = await AdminModel.findOne({ address })

        return admin
    } catch (err) {
        console.log(err)
    }
}