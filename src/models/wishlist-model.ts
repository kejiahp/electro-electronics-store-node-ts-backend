import mongoose from "mongoose";
import { UserDocument } from "./user-model";

export interface WishListDocument extends mongoose.Document{
    userId: UserDocument["_id"]
    wishListItems: object[]
}

const WishListSchema = new mongoose.Schema<WishListDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    wishListItems: [mongoose.Schema.Types.Mixed]
},{timestamps: true})

const WishList = mongoose.model('WishList', WishListSchema)

export default WishList