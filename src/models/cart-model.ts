import mongoose from "mongoose";
import { ProductDocument } from "./product-model";
import { UserDocument } from "./user-model";

// type cartItems = Omit<ProductDocument, "createdAt" | "updatedAt" | "">

export interface CartDocument extends mongoose.Document{
    userId: UserDocument["_id"]
    cartItems: object[]
    cartQuantity: number
    cartTotal: number
}

const CartSchema = new mongoose.Schema<CartDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cartItems: [mongoose.Schema.Types.Mixed],
    cartQuantity: {
        type: Number,
        required: [true, "cartQuantity is required"]
    },
    cartTotal: {
        type: Number,
        required: [true, "cartTotal is required"]
    }
},{timestamps: true})

const Cart = mongoose.model('Cart', CartSchema)

export default Cart