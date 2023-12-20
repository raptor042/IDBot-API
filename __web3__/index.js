import { ethers } from "ethers"
import { IDBot_CA } from "./config.js"
import { getSigner } from "./init.js"

import IDBot_ABI from "./IDBot.json" assert {type:"json"}
import Profile_ABI from "./Profile.json" assert {type:"json"}

export const createIDBotDID = async (data, nfts) => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const country = data.country.split(",")[0]
    const phone = `+${data.country.split(",")[2]} ${data.phone}`
    const dev = data.dev == "true" ? true : false
    console.log(country, phone, dev, nfts)
    // console.log(await await idbot._profiles(1))

    const _profile = await idbot.createProfile(
        data.name,
        data.description,
        dev,
        data.email,
        data.age,
        phone,
        country,
        data.state,
        data.address,
        [nfts[0].url, nfts[1].url],
        data.account,
        Number(data.phone)
    )
    console.log(_profile)

    await idbot.on("CreateProfile", (profile, owner, profileId, e) => {
        console.log(`A user with public address : ${owner} has created an IDBot profile at ${profile}. Your IDBot profile ID is ${profileId}.`)
    })
}

export const verifyIDBotProfile = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const verify = await idbot_profile.addVerification()
    console.log(verify)
}

export const unverifyIDBotProfile = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const unverify = await idbot_profile.removeVerification()
    console.log(unverify)
}