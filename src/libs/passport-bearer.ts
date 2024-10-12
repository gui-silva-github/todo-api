import { Strategy as BearerStrategy } from "passport-http-bearer";
import { findUserByToken } from "../services/user";
import { RequestHandler } from "express";
import passport, { use } from "passport";
import { User } from "../types/User";

export const bearerStrategy = new BearerStrategy(async (token, done)=>{

    const user = await findUserByToken(token)

    if(user){
        return done(null, user)
    } else {
        return done(null, false)
    }

})

export const bearerStrategyAuth: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('bearer',
        (err: any, user: User | false)=>{
            if(user){
                req.user = user
                return next()
            }
            return res.status(401).json({ error: "Acesso negado!"})
        }
    )

    authRequest(req, res, next)
}