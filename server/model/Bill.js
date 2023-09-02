import mongoose from "mongoose";
const BillSchema = new mongoose.Schema(
{
    user:{
        userId :{type:mongoose.Schema.Types.ObjectId,
        ref:"User"},  
    },
    products:[
        {
        product :{type:mongoose.Schema.Types.ObjectId,
        ref:"Product"},
        price:Number,
        number:Number,
        }
    ],
    totalPrice:Number,
    billDes:{
        type:String,
        default: "Đang đợi xác nhận",
        enum: [
        "Đang đợi xác nhận",    
        "Đơn đã duyệt",
        "Đơn đã hủy",
        "Đang giao",
        "Đã giao",
        "Giao thất bại"    
        ]
    }
},
{timestamps:true}
)
const Bill = mongoose.model("Bill",BillSchema)
export default Bill