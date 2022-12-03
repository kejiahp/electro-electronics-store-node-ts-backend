import { DocumentDefinition, UpdateQuery } from "mongoose"
import Product, { ProductDocument } from "../models/product-model"

export const createProductService = async (input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>) => {
    try{
        const product = await Product.create(input)
        return product
    }catch(e:any){
        console.log(e)
        return false
    }
}
export const getProductService = async (id:string) => {}

export const getAllProductService = async () => {
    try{
        return await Product.find({})
    }catch(e:any){
        return false
    }
}

export const updateProductService = async (id:string,query:UpdateQuery<ProductDocument>) => {}

export const deleteProductService = async (id:string) => {}