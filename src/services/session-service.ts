import { DocumentDefinition } from "mongoose"
import Session, { SessionDocument } from "../models/session-model"

export const createSessionService = async (input: DocumentDefinition<Omit<SessionDocument, "createdAt" | "updateAt" | "valid">>) => {
    try{
        const session = await Session.create(input)
        return session.toJSON()
    }catch(e:any){
        return false
    }
}