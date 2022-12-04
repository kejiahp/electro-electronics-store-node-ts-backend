import {Request, Response} from 'express'
import { OrderInput } from '../schemas/order-schema'
import { createOrderService, getAllOrdersService } from '../services/order-service'

export const createOrderController = async (req:Request<{},{},OrderInput["body"]>, res: Response) => {
    const userId = res.locals.user._id

    const input = {...req.body, userId}

    const order = await createOrderService(input)

    if(!order) return res.status(500).send("order was not created")

    return res.status(201).send(order)
}

export const getAllOrdersController = async (req:Request, res:Response) => {
    const userId = res.locals.user._id

    const orders = await getAllOrdersService(userId)

    if(!orders) return res.status(500).send("can't get user orders")

    return res.status(200).send(orders)
}