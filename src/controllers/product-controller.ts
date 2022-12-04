import { Request, Response } from "express"
import { createProductInput, deleteProductInput, getProductInput, updateProductInput } from "../schemas/product-schema"
import { createProductService, deleteProductService, getAllProductService, getProductService, updateProductService } from "../services/product-service"

export const createProductController = async (req: Request<{},{},createProductInput["body"]>, res:Response) => {
    const isAdmin = res.locals.user.isAdmin

    if(!isAdmin) return res.status(401).send("Unauthorized User")

    const input = req.body
    const product = await createProductService(input)

    if(!product) return res.status(500).send("product can't be added")

    return res.status(201).send(product)
}
export const getAllProductController = async (req: Request, res:Response) => {
    const products = await getAllProductService()

    if(!products) return res.status(500).send("cant get all products")

    return res.status(200).send(products)
}
export const getProductController = async (req: Request<getProductInput["params"]>, res:Response) => {
    const productId = req.params.productId

    const product = await getProductService(productId)

    if(!product) return res.status(500).send("cant get the product")

    return res.status(200).send(product)
}

export const updateProductController = async (req: Request<updateProductInput["params"]>, res:Response) => {
    const isAdmin = res.locals.user.isAdmin

    if(!isAdmin) return res.status(401).send("Unauthorized User")

    const productId = req.params.productId

    const body = req.body

    const product = await updateProductService(productId, body, {new: true})

    if(!product) return res.status(500).send("cant update the product")

    return res.status(200).send(product)
}

export const deleteProductController = async (req: Request<deleteProductInput["params"]>, res:Response) => {
    const productId = req.params.productId

    const product = await deleteProductService(productId)

    if(!product) return res.status(500).send("cant delete the product")

    return res.status(200).send("product successfully deleted")
}