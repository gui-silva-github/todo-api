import { User } from "../types/User"
import jwt from "jsonwebtoken"

export const findUserByEmailAndPassword = async (email: String, password: String) => {

    if(email === 'todo@gmail.com' && password === '@todo'){
        const user: User = {
            name: "todoUser"
        }
        return user
    }

    return null

}

export const createUserToken = (user: User) => {
    return 'todoToken'
}

export const findUserByToken = async (token: string) => {

    if(token === 'todoToken'){
        const user: User = {
            name: "todoUser"
        }
        return user
    }

    return null

}

export const findUserByName = (name: string) => {

    if(name === "todoUser"){
        const user: User = {
            name: "todoUser"
        }
        return user
    }
    return null

}

export const createUserJWT = (user: User) => {

    const payload = {
        name: user.name
    }

    return jwt.sign(payload, process.env.JWT_KEY as string, {
        expiresIn: "30 days"
    })

}

