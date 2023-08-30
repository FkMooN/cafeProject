import User from "../model/User.js"
import jsonwebtoken from "../configs/jwtoken.js"
import refreshToken from "../configs/refreshToken.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"


const RegisterUser = async(req,res)=>{
    const {email} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds)
    try {
        const findUser = await User.findOne({email:email})
        if(!findUser){
           req.body.password = bcrypt.hashSync(req.body.password, salt); 
           const result = await User.create(req.body)
           res.json({
            user:result,    
            mess:"Đăng kí thành công",
            status:"success"
           })
        }
        else{
            res.json({
                mess:"Email đã tồn tại",
                status:"fail"

               })
        }
        
    } catch (error) {
        console.log(error);
    }
 
 
    } 



const LoginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const findUser = await User.findOne({email:email})
        console.log("findUser:",findUser);
        if(findUser){
         if(bcrypt.compareSync(password, findUser.password)){
            const refreshTokenie = refreshToken.generateRefreshToken(findUser._id)
            const updateUser = await User.findByIdAndUpdate(findUser._id,
                {
                    refreshToken : refreshTokenie
                }
                ,{
                    new:true
                })
                res.cookie('refreshToken',refreshTokenie,
                {httpOnly:false,
                maxAge:72*60*60*1000})
                

             res.json({
                refreshToken:refreshTokenie,
                token:jsonwebtoken.generateToken(findUser?._id),
                user:findUser,
                mess:"Đăng nhập thành công",
                status:"success"
             })
         }
         else{
             res.json({
                mess:'Mật khẩu không chính xác',
                status:"fail"
             })
     
         }
        }
        else{
         res.json({
            mess:'Email không tồn tại',
            status:"fail"
         })
     
        }
    } catch (error) {
        console.log(error);
    }
   
}

const LogoutUser = async(req, res)=>{

    const refreshToken = req.cookies.refreshToken
      try {
        if(!req.cookies?.refreshToken)  
      res.json({
        mess:"Refresh token hiện không tồn tại"
      })
    const checkRefresh = await User.findOne({refreshToken})  
    if(!checkRefresh){
        res.clearCookie("refreshToken","",
        {httpOnly:true,
        secure:true}
        )
        return res.sendStatus(204)
    }
    await User.findByIdAndUpdate(req.user._id,{
        refreshToken:""
    })
    res.clearCookie("refreshToken","",
    {httpOnly:true,
    secure:true}    
    )
    return res.sendStatus(204)
      } catch (error) {
        console.log(error);
      }

}


const getAllUser = async(req,res)=>{
    try {
        const users = await User.find()
        if(users){
            res.json(users)
        }
    } catch (error) {
        
    }
}
const getUser = async(req,res)=>{
    const {id} = req.params
    const user = await User.findOne({_id:id}).populate(
        "wishlist.proId"
    ) 
    try {
        if(user){
            res.json({
                user: user,
                status:"success"
            })
        }
        else{ 
            res.json({
                mess:"không tìm thấy người dùng"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
const deleteUser = async(req,res)=>{
    const {id} = req.params
    try {
    const user = await User.findByIdAndDelete({_id:id}) 
        if(user){
            res.json({
                user: user,
                mess:"Xóa người dùng thành công"
            })
        }
        else{ 
            res.json({
                mess:"Không tìm thấy người dùng"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async(req,res)=>{
    const {id} = req.params
    const {userName,email,password,location,phone,fullName} = req.body
    try {
    const user = await User.findByIdAndUpdate({_id:id},{
        userName:userName,
        email:email,
        fullName:fullName,
        password:password,
        location:location,
        phone:phone
    }) 
        if(user){
            res.json({
                user: user,
                mess:"Cập nhật người dùng thành công"
            })
        }
        else{ 
            res.json({
                mess:"không tìm thấy người dùng"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

    const handleRefresh = async(req, res)=>{
        const refreshToken = req.cookies.refreshToken
        try { 

        if(!refreshToken){
            res.json({
                mess:"Hiện đang không có refresh token trong cookie" 
            })
        }
        const user = await User.findOne({refreshToken})
            if(!user){
               res.json({
                mess:"Hiện đang không có refresh token trong database"
               }) 
            }
            jwt.verify(refreshToken,'private',(err,decoded)=>{
                if(err || decoded.id!= user._id){
                    res.json({
                        mess:"Có gì hơi sai với refresh token rồi đại vương"
                    })
                }
                else{
                  const accessToken =  jsonwebtoken.generateToken(user?._id)
                  res.json({accessToken})
                }
            })
           
                
        } catch (error) {
            console.log(error);
        }
    }

export default {RegisterUser,LoginUser,getAllUser,getUser,deleteUser,updateUser,handleRefresh, LogoutUser}