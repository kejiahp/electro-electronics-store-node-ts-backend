import { DocumentDefinition } from "mongoose";
import Order, { OrderDocument } from "../models/order-model";

export const createOrderService = async (input:DocumentDefinition<Omit<OrderDocument, "createdAt" | "updatedAt">>) => {
    try{
        const order = await Order.create(input)

        return order.toJSON()
    }catch(e){
        return false
    }
}

export const getAllOrdersService = async (id:string) => {
    try{
        const orders = await Order.find({userId:id})

        return orders
    }catch(e){
        return false
    }
}