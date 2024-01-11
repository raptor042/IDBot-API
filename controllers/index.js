import bcrypt from "bcrypt"
import crypto from "crypto"
import path from "path"
import fs from "fs"

export const encryptPassword = async (password) => {
    const rounds = 10
    const hash = await bcrypt.hash(password, rounds)
    console.log(rounds, hash)

    return hash
}

export const decryptPassord = async (password, hash) => {
    const _password = await bcrypt.compare(password, hash)
    console.log(_password)

    return _password
}

export const encrypt = text => {
    const absolutePath = path.resolve("./pub.pem")
    const pubKey = fs.readFileSync(absolutePath, "utf-8")
    const buffer = Buffer.from(text, "utf-8")
    const encryptedText = crypto.publicEncrypt({
        key: pubKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }, buffer)

    return encryptedText.toString("hex")
}

export const decrypt = text => {
    const absolutePath = path.resolve("./sec.pem")
    const secKey = fs.readFileSync(absolutePath, "utf-8")
    const buffer = Buffer.from(text, "hex")
    const decryptedText = crypto.privateDecrypt({
        key: secKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }, buffer)

    return decryptedText.toString()
}