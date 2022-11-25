import { Request, Response } from "express"
import { CreateUserInput } from "../schemas/user-schema"
import { createUserService } from "../services/user-service"
import logger from "../utils/logger"

export const createUserController = async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) => {
    try{
        const user = await createUserService(req.body)
        res.status(201).send(user)
    }catch(error:any){
        logger.error(error)
        res.status(409).send(error.message)
    }
}