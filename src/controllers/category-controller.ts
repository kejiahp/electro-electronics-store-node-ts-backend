import { Response, Request } from 'express'
import { categoryInput } from '../schemas/category-schema'
import { addCategoryService } from '../services/category-service'

export const addCategoryController = async (req: Request<{},{},categoryInput["body"]>, res:Response) => {
    const isAdmin = res.locals.user.isAdmin

    if(!isAdmin) return res.status(401).send("Unauthorized Request")

    const name = req.body

    const category = await addCategoryService(name)

    if(!category) return res.status(500).send("unable to create category")

    return res.status(201).send(category)
}