import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
    name: string,
    brand: string,
    category: string[],
    instock: boolean,
    description: string,
    moreDetails: string,
    prevPrice: number,
    currPrice: number,
    createdAt: Date,
    updatedAt: Date
}

const ProductSchema = new mongoose.Schema<ProductDocument>({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    brand: {
        type: String,
        required: [true, "brand is required"]
    },
    instock: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: [true, 'description is required']
    }
})

const Product = mongoose.model("Product", ProductSchema)

export default Product