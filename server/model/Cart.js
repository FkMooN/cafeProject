import mongoose from "mongoose";
const CartSchema = new mongoose.Schema(
{
    
        user :{type:mongoose.Schema.Types.ObjectId,
        ref:"User"},  
    
    products:[
        {
        product :{type:mongoose.Schema.Types.ObjectId,
        ref:"Product"},
        price:Number,
        number:Number,
        }
    ],
    totalPrice:Number,
},
{timestamps:true}
)
const Cart = mongoose.model("Cart",CartSchema)
export default Cart