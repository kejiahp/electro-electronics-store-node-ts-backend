import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Address, { AddressDocument } from "../models/address-model";

export const createAddressService = async (input: DocumentDefinition<Omit<AddressDocument, 'createdAt'|'updatedAt'>>) => {
    try{
        const address = await Address.create(input)

        return address.toJSON()
    }catch(e){
        return false
    }
}

export const findAddress = async (query: FilterQuery<AddressDocument>) => {
    try{
        const address = await Address.findOne(query)
        return address?.toJSON()
    }catch(e){
        return false
    }
}

export const updateAddressService = async (id:string,query:UpdateQuery<AddressDocument>, options:QueryOptions) => {
    try{
        return await Address.findByIdAndUpdate(id, query, options)
    }catch(e){
        return false
    }
}