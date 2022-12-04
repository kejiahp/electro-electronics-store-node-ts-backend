import {Request, Response} from 'express'
import { CartInput } from '../schemas/cart-schema'
import { getUserCartService, updateUserCartService } from '../services/cart-service'

export const getUserCartController = async (req:Request, res:Response) => {
    const userId = res.locals.user._id

    const cart = await getUserCartService(userId)
    
    if(!cart) return res.status(404).send("user doesnt have a cart")

    return res.status(200).send(cart)
}

export const updateUserCartController = async (req:Request<{},{},CartInput["body"]>, res:Response) => {
    const userId = res.locals.user._id

    const cart = await updateUserCartService(userId, req.body, {new: true})
    
    if(!cart) return res.status(404).send("can't update cart")

    return res.status(200).send(cart)
}