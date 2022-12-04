import mongoose from "mongoose";
import { UserDocument } from "./user-model"

export interface AddressDocument extends mongoose.Document{
    userId: UserDocument["_id"],
    state: string,
    city: string,
    country: string,
    addressDesc: string,
    phoneNumber1: string,
    phoneNumber2?: string,
    createdAt: Date,
    updatedAt: Date
}

const AddressSchema = new mongoose.Schema<AddressDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
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
}, {timestamps: true})

const Address = mongoose.model("Address",AddressSchema)

export default Address