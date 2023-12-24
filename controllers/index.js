import bcrypt from "bcrypt"

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