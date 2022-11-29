import { DocumentDefinition, FilterQuery } from "mongoose"
import Session, { SessionDocument } from "../models/session-model"

export const createSessionService = async (input: DocumentDefinition<Omit<SessionDocument, "createdAt" | "updateAt" | "valid">>) => {
    try{
        const session = await Session.create(input)
        return session.toJSON()
    }catch(e:any){
        return false
    }
}

export const getUserSessionService = async (userId: FilterQuery<SessionDocument["_id"]>) => {
    try{
        
        const session = await Session.findOne({userId: userId, valid: true})
        
        if(!session) {
            return false
        }
        
        return session.toJSON()
    }catch(e:any){   
        return false
    }

}