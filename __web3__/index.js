import { ethers } from "ethers"
import { IDBot_CA } from "./config.js"
import { getProvider, getSigner } from "./init.js"

import IDBot_ABI from "./IDBot.json" assert {type:"json"}

export const verifyIDBotProfile = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const verify = await idbot.addVerification(user)
    console.log(verify)
}

export const unverifyIDBotProfile = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const unverify = await idbot.removeVerification(user)
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

export const getUser = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const name = await idbot.getUser(user)
    console.log(name)
    
    return name
}

export const getIDBotNumber = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const name = await idbot.getIDBotNumber(user)
    console.log(name)
    
    return name
}

export const getName = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const name = await idbot.getName(user)
    console.log(name)
    
    return name
}

export const getDescription = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const description = await idbot.getDescription(user)
    console.log(description)
    
    return description
}

export const getEmail = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const email = await idbot.getEmail(user)
    console.log(email)
    
    return email
}

export const getAge = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const age = await idbot.getAge(user)
    console.log(age)
    
    return age
}

export const getCountry = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const country = await idbot.getCountry(user)
    console.log(country)
    
    return country
}

export const getState = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getProvider()
    )

    const state = await idbot.getState(user)
    console.log(state)
    
    return state
}

export const getPhone = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const phone = await idbot.getPhone(user)
    console.log(phone)
    
    return phone
}

export const getAddress = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const address = await idbot.getAddress(user)
    console.log(address)
    
    return address
}

export const getProfilePic = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const pic = await idbot.getProfilePic(user)
    console.log(pic)
    
    return pic
}

export const getScore = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const score = await idbot.getReputationScore(user)
    console.log(Number(score))
    
    return Number(score)
}

export const getProjects = async user => {
    const ABI = JSON.stringify(IDBot_ABI)
    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        getSigner()
    )

    const projects = await idbot.getProjects(user)
    console.log(projects)

    const _projects = [
        projects[0][0],
        projects[0][1],
        projects[0][2],
        projects[0][3],
        projects[0][8],
        projects[0][9],
        projects[0][10],
        Number(projects[0][11])
    ]

    return _projects
}