import { NFTStorage, File } from "nft.storage"
import mime from "mime"
import fs from "fs"
import path from "path"
import { config } from "dotenv"

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