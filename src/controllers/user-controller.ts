import { Request, Response } from "express"
import { CreateUserInput } from "../schemas/user-schema"
import { createUserCartService } from "../services/cart-service"
import { createUserService } from "../services/user-service"
import { createUserWishListService } from "../services/wishlist-service"
import logger from "../utils/logger"

export const createUserController = async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) => {
    try{
        const user = await createUserService(req.body)
        
        const userId = user._id
        const userCart = await createUserCartService(userId)
        const userWishList = await createUserWishListService(userId)

        res.status(201).json({user, userCart, userWishList})
    }catch(error:any){
        logger.error(error)
        res.status(409).send(error.message)
    }
}