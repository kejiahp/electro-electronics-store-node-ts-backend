import { Request, Response } from "express"
import { createProductInput } from "../schemas/product-schema"
import { createProductService } from "../services/product-service"

export const createProductController = async (req: Request<{},{},createProductInput["body"]>, res:Response) => {
    // const isAdmin = res.locals.user.isAdmin
    // console.log(res.locals.user)

    // if(!isAdmin) return res.status(401).send("Unauthorized User")

    const input = req.body
    const product = await createProductService(input)

    if(!product) return res.status(500).send("product can't be added")

    return product
}
export const updateProductController = (req: Request, res:Response) => {}
export const deleteProductController = (req: Request, res:Response) => {}
export const getProductController = (req: Request, res:Response) => {}
export const getAllProductController = (req: Request, res:Response) => {}