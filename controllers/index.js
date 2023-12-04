import ethers from "ethers"
import crypto from "crypto"

const createWallet = async () => {
    const randBytes = crypto.randomBytes(32).toString("hex")
    const privateKey = `0x${randBytes}`
    console.log("Private Key", privateKey)

    const wallet = new ethers.Wallet(privateKey)
    console.log("Public Address", wallet)

    return wallet
}

export const createIDBotDID = async (data) => {
    const {
        name,
        email,
        phone,
        age,
        country,
        state,
        passport
    } = data
    
    const wallet = createWallet()


    return { wallet }
}