import { QueryOptions, UpdateQuery } from "mongoose"
import WishList, { WishListDocument } from "../models/wishlist-model"

export const createUserWishListService = async (id:string) => {
    try{
        const initialWishListState = {
            userId: id,
            wishListItems: []
        }
        const wishlist = await WishList.create(initialWishListState)
        return wishlist
    }catch(e:any){
        throw new Error(e)
    }
}

export const getUserWishListService = async (id:string) => {
    try{
        const wishlist = await WishList.findOne({userId:id})
        return wishlist?.toJSON()
    }catch(e){
        return false
    }
}

export const updateUserWishListService = async (id:string, query:UpdateQuery<WishListDocument>, options:QueryOptions) => {
    try{
        const wishlist = await WishList.findByIdAndUpdate(id,query,options)

        return wishlist
    }catch(e){
        return false
    }
}