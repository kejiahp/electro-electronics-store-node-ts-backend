import mongoose from "mongoose";
import { UserDocument } from "./user-model";

export interface OrderDocument extends mongoose.Document{
    userId: UserDocument["_id"]
}

const addressStructure = {
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
        type: Number,
        required: [true, 'phonenumber1 must be provided']
    },
    phoneNumber2: {
        type: Number,
        required: false
    }
}

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    AddressInfo: {addressStructure},
    
},{timestamps: true})