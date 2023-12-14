import { ethers } from "ethers"
import { IDBot_CA } from "./config.js"
import { getSigner } from "./init.js"

import IDBot_ABI from "./IDBot.json" assert {type:"json"}

export const createIDBotDID = async (data, url, hash) => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )
    const profile = undefined
    const profileId = undefined

    const country = data.country.split(",")[0]
    const phone = `+${data.country.split(",")[2]} ${data.phone}`
    const dev = data.dev == "true" ? true : false
    console.log(country, phone, dev, await idbot._profiles(1))
    // console.log(await idbot.profileIds(1))
    // console.log(await idbot.profiles(await idbot.profileIds(0)))

    const _profile = await idbot.createProfile(
        data.name,
        data.description,
        dev,
        data.email,
        Number(data.age),
        phone,
        country,
        data.state,
        data.address,
        url,
        data.account,
        hash
    )
    console.log(_profile)

    idbot.on("CreateProfile", (profile, owner, profileId, e) => {
        console.log(`A user with public address : ${owner} has created an IDBot profile at ${profile}. Your IDBot profile ID is ${profileId}.`)
    })

    return { profile, profileId }
}