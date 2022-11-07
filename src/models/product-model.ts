import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
    name: string,
    brand: string,
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
        required: [true, "product name is required"]
    },
    brand: {
    }
})

const Product = mongoose.model("Product", ProductSchema)

export default Product