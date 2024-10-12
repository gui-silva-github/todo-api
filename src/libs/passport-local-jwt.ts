import { Strategy as LocalStrategy } from "passport-local";
import { createUserJWT, findUserByEmailAndPassword } from "../services/user"
import { RequestHandler } from "express";
import passport from "passport";

type LocalStrategyResponse = {
    sucesso: { token: string }
}

export const localStrategyJWT = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    const user = await findUserByEmailAndPassword(email, password)

    if(user){

        const token = createUserJWT(user)

        const response: LocalStrategyResponse = {
            sucesso: { token }
        }

        return done(null, response)

    } else {

        return done(null, false)

    }

})

export const localStrategyAuthJWT: RequestHandler = (req, res, next) => {

    const authRequest = passport.authenticate('local-jwt', 
        (err: any, response: LocalStrategyResponse | false)=> {
            if(response){
                req.authInfo = response.sucesso.token
                return next()
            }
            return res.status(401).json({ error: "Acesso negado!"} )
        }
    )

    authRequest(req, res, next)

}