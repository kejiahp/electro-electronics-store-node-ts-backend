import mongoose from "mongoose";

export interface CategoryDocument extends mongoose.Document{
    name: string
}

const CategorySchema = new mongoose.Schema<CategoryDocument>({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    }
})

const Category = mongoose.model("Category", CategorySchema)

export default Category