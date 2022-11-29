import mongoose from "mongoose";
import { UserDocument } from "./user-model";

export interface SessionDocument extends mongoose.Document{
    userId: UserDocument["_id"],
    userAgent: string,
    valid: boolean,
    createdAt: Date,
    updateAt: Date
}

const SessionSchema = new mongoose.Schema<SessionDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userAgent: {
        type: String,
    },
    valid: {
        type: Boolean,
        default: true
    }
},{timestamps:true})

const Session = mongoose.model("Session", SessionSchema)
export default Session