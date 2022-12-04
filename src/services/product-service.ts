import { DocumentDefinition, QueryOptions, UpdateQuery } from "mongoose"
import Product, { ProductDocument } from "../models/product-model"

export const createProductService = async (input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>) => {
    try{
        const product = await Product.create(input)
        return product.toJSON()
    }catch(e:any){
        console.log(e)
        return false
    }
}
export const getProductService = async (id:string) => {
    try{
        return await Product.findById(id)
    }catch(e){
        return false
    }
}

export const getAllProductService = async () => {
    try{
        return await Product.find({})
    }catch(e:any){
        return false
    }
}

export const updateProductService = async (id:string,query:UpdateQuery<ProductDocument>, options:QueryOptions) => {
    try{
        const product = await Product.findByIdAndUpdate(id, query, options)

        return product?.toJSON()
    }catch(e){
        return false
    }
}

export const deleteProductService = async (id:string) => {
    try{
        return await Product.findByIdAndDelete(id)
    }catch(e){
        return false
    }
}