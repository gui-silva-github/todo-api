import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import dotenv from 'dotenv'
import { User } from '../types/User'
import { findUserByName } from '../services/user'
import { RequestHandler } from 'express'
import passport from 'passport'

dotenv.config()

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY as string
}

export const jwtStrategy = new JWTStrategy(options, async(payload, done) => {

    const {name} = payload

    const user = await findUserByName(name)

    if(user){
        return done(null, user)
    } else {
        return done(null, false)
    }

})

export const jwtStrategyAuth: RequestHandler = (req, res, next) => {

    const authRequest = passport.authenticate('jwt',
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