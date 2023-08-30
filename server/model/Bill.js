import mongoose from "mongoose";
const BillSchema = new mongoose.Schema(
{
    user:{
        userId :{type:mongoose.Schema.Types.ObjectId,
        ref:"User"},
       
    },
    product:[
        {
        proId :{type:mongoose.Schema.Types.ObjectId,
        ref:"Product"},
        price:Number,
        number:Number,
        total:Number
        }
    ],
    totalPrice:Number,
    billCode:Number,
    billDes:String

},
{timestamps:true}
)
const Bill = mongoose.model("Bill",BillSchema)
export default Bill