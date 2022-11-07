import mongoose from "mongoose";
import bcrypt from "bcrypt"
import config from "config"

export interface UserDocument extends mongoose.Document {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    isActive: boolean,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date
}

const UserSchema = new mongoose.Schema<UserDocument>({
    firstname: {
        type: String,
        required: [true, 'firstname is required'],
        minlength: 6,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required'],
        minlength: 6,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamps: true})


UserSchema.pre('save', async function (next){
    if(!this.isModified("password")){
        return next()
    }
    const saltRounds = config.get<number>("saltRounds")
    const salt = await bcrypt.genSalt(saltRounds)

    this.password = await bcrypt.hash(this.password, salt)

    return next()
})

const User = mongoose.model("User", UserSchema)

export default User