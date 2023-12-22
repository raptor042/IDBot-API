import { NFTStorage, File } from "nft.storage"
import mime from "mime"
import fs from "fs"
import path from "path"
import { config } from "dotenv"
import bcrypt from "bcrypt"

config()

const fileFromPath = async (filePath) => {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)

    return new File([content], path.basename(filePath), { type })
}

export const storeNFTs = async (arts) => {
    const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })
    const nfts = []

    for (let i = 0; i < arts.length; i++) {
        const image = await fileFromPath(arts[i].imagePath)

        const nft = await nftstorage.store({
            image,
            name : arts[i].name,
            description : arts[i].description
        })
        console.log(nft)

        nfts.push(nft)
    }

    return nfts
}

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