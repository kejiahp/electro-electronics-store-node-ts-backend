import { DocumentDefinition, FilterQuery } from "mongoose";
import Category, { CategoryDocument } from "../models/category-model";

export const addCategoryService = async (name:DocumentDefinition<Omit<CategoryDocument, 'createdAt'|'updatedAt'>>) => {
    try{
        const category = await Category.create(name)

        return category
    }catch(e:any){
        return false
    }
}

export const getCategoryId = async (query: FilterQuery<CategoryDocument>) => {
    try{
        const product = await Category.findOne({query})

        return product?._id
    }catch(e:any){
        return false
    }
}