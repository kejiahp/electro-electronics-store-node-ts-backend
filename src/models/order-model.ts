import mongoose from "mongoose";
import { UserDocument } from "./user-model";

export interface OrderDocument extends mongoose.Document{
    userId: UserDocument["_id"]
    orderItems: object[]
    addressInfo: object
}

const addressStructure = new mongoose.Schema({
    state: {
        type: String,
        required: [true, 'state is required']
    },
    city: {
        type: String,
        required: [true, 'city is required']
    },
    addressDesc: {
        type: String,
        required: [true, 'provide more address information']
    },
    country: {
        type: String,
        required: [true, 'country is required']
    },
    phoneNumber1: {
        type: String,
        required: [true, 'phonenumber1 must be provided']
    },
    phoneNumber2: {
        type: String,
        required: false
    }
})

const OrderSchema = new mongoose.Schema<OrderDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItems: [mongoose.Schema.Types.Mixed],
    addressInfo: addressStructure
},{timestamps: true})

const Order = mongoose.model('Order', OrderSchema)

export default Order