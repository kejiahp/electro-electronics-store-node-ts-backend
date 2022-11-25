import jwt, { SignOptions } from "jsonwebtoken"
import config from "config"

export const signJwt = (payload: object, options?: SignOptions) => {
    try{
        const secret = config.get<string>("jwtSecret")
        return jwt.sign(payload,secret,{...options && options})
    }catch(e){
        return false
    }
}