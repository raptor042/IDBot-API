import { ethers } from "ethers"
import { IDBot_CA } from "./config.js"
import { getProvider, getSigner } from "./init.js"

import IDBot_ABI from "./IDBot.json" assert {type:"json"}
import Profile_ABI from "./Profile.json" assert {type:"json"}

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

export const unsubscribe = async () => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const unsubscribe = await idbot.unsubscribe()
    console.log(unsubscribe)
}

export const getProfileAddressI = async address => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const profile = await idbot.profiles(address)
    console.log(profile)

    return profile
}

export const getProfileAddressII = async idbot_number => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const profile = await idbot.profiles_(idbot_number)
    console.log(profile)
    
    return profile
}

export const getName = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const name = await idbot_profile.getName()
    console.log(name)
    
    return name
}

export const getDescription = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const description = await idbot_profile.getDescription()
    console.log(description)
    
    return description
}

export const getEmail = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const email = await idbot_profile.getEmail()
    console.log(email)
    
    return email
}

export const getAge = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const age = await idbot_profile.getAge()
    console.log(age)
    
    return age
}

export const getCountry = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const country = await idbot_profile.getCountry()
    console.log(country)
    
    return country
}

export const getState = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getProvider()
    )

    const state = await idbot_profile.getState()
    console.log(state)
    
    return state
}

export const getPhone = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const phone = await idbot_profile.getPhone()
    console.log(phone)
    
    return phone
}

export const getAddress = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const address = await idbot_profile.getAddress()
    console.log(address)
    
    return address
}

export const getProfilePic = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const pic = await idbot_profile.getProfilePic()
    console.log(pic)
    
    return pic
}

export const getScore = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const score = await idbot_profile.getReputationScore()
    console.log(Number(score))
    
    return Number(score)
}

export const getProjects = async profile => {
    const ABI = JSON.stringify(Profile_ABI)
    const idbot_profile = new ethers.Contract(
        profile,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const projects = await idbot_profile.getProjects()
    console.log(projects)

    const _projects = [
        projects[0],
        projects[1],
        projects[2],
        projects[3],
        projects[8],
        projects[9],
        projects[10],
        projects[11]
    ]

    return _projects
}