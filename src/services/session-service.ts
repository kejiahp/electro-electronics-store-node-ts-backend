import { get } from "lodash"
import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"
import Session, { SessionDocument } from "../models/session-model"
import { signJwt, verifyJwt } from "../utils/jwt-utils"
import { findUser } from "./user-service"
import config from "config"

export const createSessionService = async (input: DocumentDefinition<Omit<SessionDocument, "createdAt" | "updateAt" | "valid">>) => {
    try{
        const session = await Session.create(input)
        return session.toJSON()
    }catch(e:any){
        return false
    }
}

export const getUserSessionService = async (userId: FilterQuery<SessionDocument["userId"]>) => {
    try{

        const session = await Session.find({userId: userId, valid: true})
        
        if(!session) {
            return false
        }
        
        return session
    }catch(e:any){   
        return false
    }
}

export const invalidateUserSession = async (query:FilterQuery<SessionDocument>, update:UpdateQuery<SessionDocument>) => {
    try{
        return await Session.updateOne(query, update)
    }catch(e:any){
        return false
    }
}

export const reIssueAccessToken = async (token: string) => {
    //verify the refresh token by using the verifyJwt helper function
    const {decoded, expired, valid} = verifyJwt(token)
    // console.log("decoded",decoded);
    

    //check if the jwt payload contains a session id or if the payload even exists
    if(!decoded || !get(decoded, "session")) return false

    //get the session from the db
    const session = await Session.findById(get(decoded, "session"))

    //check if the session is valid
    if(!session || !session.valid) return false

    //find the user the session belongs to
    const user = await findUser({_id: session.userId})

    if(!user) return false

    //if there is a user release a new access token
    const accessToken = signJwt({...user, session: session._id}, {expiresIn: config.get<string>("accessTokenTtl")})

    return accessToken
}