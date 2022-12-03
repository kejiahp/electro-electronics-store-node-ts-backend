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

export const getCategoriesService = async () => {
    try{
        const product = await Category.find({})
        return product
    }catch(e:any){
        return false
    }
}