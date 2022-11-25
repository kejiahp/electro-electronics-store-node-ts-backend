import mongoose from "mongoose";
import { UserDocument } from "./user-model";

export interface WishListDocument extends mongoose.Document{
    userId: UserDocument["_id"],

}

const WishListSchema = new mongoose.Schema({},{timestamps: true})