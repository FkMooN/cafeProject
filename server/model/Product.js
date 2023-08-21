import mongoose from "mongoose"
const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    body:String,
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String
    },
    quantity:{
        type:Number,
        required:true
    } ,  
    sold:{
        type:Number,
    }, 
    image:{
        data: Buffer,
	    contentType: String,

    },
    rating:[{
        star:Number,
        postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
    }]
},{timestamps:true})
const Product = mongoose.model('Product',ProductSchema)
export default Product