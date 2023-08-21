import mongoose from "mongoose";
const CateSchema = new mongoose.Schema({
    cateName:{
        type:String,
    },  
})
const Category = mongoose.model("Category",CateSchema)
export default Category 