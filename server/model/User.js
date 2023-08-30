import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true
    },
    fullName:{
        type:String,
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: false
    },
    phone:{
        type:String,
        required: false
    },
    role:{
        type:String,
        default: 'user',
        required: false
    },
    wishlist:[
        {
            proId :{type:mongoose.Schema.Types.ObjectId,
            ref:"Product"},
            number:Number,
            price:Number,
            totalPrice:{
            type:Number,
            default:0
            }   
        }
        
    ],
    refreshToken :{
        type:String,
    }
    },
    {timestamps:true}
    )
const User = mongoose.model('User',UserSchema)
export default User
