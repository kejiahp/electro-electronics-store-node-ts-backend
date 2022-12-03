import mongoose from "mongoose";
import { CategoryDocument } from "./category-model";

export interface ProductDocument extends mongoose.Document {
    name: string,
    brand: string,
    attributes: [object],
    category: CategoryDocument["_id"],
    gallery: string[],
    instock: boolean,
    description: string,
    moreDetails?: string,
    discount?: number,
    price: number,
    createdAt: Date,
    updatedAt: Date
}


const attributesValues = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "attriute name is required"]
    },
    items: [{
        displayValue: String,
        value: String
    }],
    type: {
        type: String,
        enum: {
            values: ["text", "swatch"],
            message: "{VALUE} is not supported"
        },
        required: [true, "attriute type is required"]
    }
})

const ProductSchema = new mongoose.Schema<ProductDocument>({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    brand: {
        type: String,
        required: [true, "brand is required"]
    },
    attributes: [attributesValues]
    ,
    gallery: {
        type: [String],
        required: [true, 'image is required']
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    instock: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    moreDetails: {
        type: String,
        default: ""
    },
    discount: {
        type: Number,
        default: 0.0
    }
}, {timestamps: true})

const Product = mongoose.model("Product", ProductSchema)

export default Product