import { QueryOptions, UpdateQuery } from "mongoose"
import Cart, { CartDocument } from "../models/cart-model"

export const createUserCartService = async (id:string) => {
    try{
        const initialCartState = {
            userId: id,
            cartItems: [],
            cartQuantity: 0,
            cartTotal: 0,
        }
        const cart = await Cart.create(initialCartState)
        return cart
    }catch(e:any){
        throw new Error(e)
    }
}

export const getUserCartService = async (id:string) => {
    try{
        const cart = await Cart.findOne({userId:id})
        return cart?.toJSON()
    }catch(e){
        return false
    }
}

export const updateUserCartService = async (id:string, query:UpdateQuery<CartDocument>, options:QueryOptions) => {
    try{
        const cart = await Cart.findByIdAndUpdate(id,query,options)

        return cart
    }catch(e){
        return false
    }
}