import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken"
import config from "config"

export const signJwt = (payload: object, options?: SignOptions) => {
    try{
        const secret = config.get<string>("jwtSecret")
        return jwt.sign(payload,secret,{...(options && options)})
    }catch(e){
        return false
    }
}

export const verifyJwt = (token:string, options?:VerifyOptions) => {
    try{
        const secret = config.get<string>("jwtSecret")
        const verifiedToken = jwt.verify(token, secret, {...(options && options)})
        return{
            valid: true,
            expired: false,
            decoded: verifiedToken
        }
    }catch(e:any){
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}