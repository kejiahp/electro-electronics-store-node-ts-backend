import User, { UserDocument } from "../models/user-model";
import { DocumentDefinition, FilterQuery } from "mongoose";
import loadash, { omit } from "lodash"

export const createUserService = async (input: DocumentDefinition<Omit<UserDocument, "createdAt"|"updatedAt"|"isActive"|"isAdmin"|"comparePassword">>) => {
    try{
        const user = await User.create(input)
        return loadash.omit(user.toJSON(), "password")
    }catch(error:any){
        throw new Error(error)
    }
}

export const validateLoginCredentials = async ({email, password}: {email:string, password: string}) => {
    const user = await User.findOne({email})

    if(!user) {
        return false
    }

    const isValid = await user.comparePassword(password)

    if(!isValid) {
        return false
    }

    return omit(user.toJSON(), "password")
}

export const findUser = async (query: FilterQuery<UserDocument>) => {
    return await User.findOne(query).lean()
}