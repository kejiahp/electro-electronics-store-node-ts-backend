import {Request, Response} from 'express'
import { WishListInput } from '../schemas/wishlist-schema'
import { getUserWishListService, updateUserWishListService } from '../services/wishlist-service'

export const getUserWishListController = async (req:Request, res:Response) => {
    const userId = res.locals.user._id

    const cart = await getUserWishListService(userId)
    
    if(!cart) return res.status(404).send("user doesnt have a cart")

    return res.status(200).send(cart)
}

export const updateUserWishListController = async (req:Request<{},{},WishListInput["body"]>, res:Response) => {
    const userId = res.locals.user._id

    const cart = await updateUserWishListService(userId, req.body, {new: true})
    
    if(!cart) return res.status(404).send("can't update cart")

    return res.status(200).send(cart)
}