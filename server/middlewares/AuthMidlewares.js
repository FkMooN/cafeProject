import User from "../model/User.js";
import jwt from "jsonwebtoken"


const Authmidlewares = (req,res,next)=>{
    let refreshToken = req.cookies.refreshToken
        try {
            if(refreshToken){
                
                jwt.verify(refreshToken,'private',async(err,decoded)=>{
                      const user = await User.findById(decoded?.id)
                    if(err){
                        res.json({
                            message:"err with token",
                            status:"fail"
                        })
                    }
                    else{
                        if(user){
                            req.user = user
                            next()        
                        }
                    }
                }) 
            
            }
            else{
                res.json({
                    message:"missing token",
                    status:"fail"
                })
            }
        } catch (error) {
            res.json({
                mess:"Not authorized token expired, please login again"
            })
        }
    }
    const isAdmin = async(req,res,next)=>{
        
        const {email} = req.user
        const adminUser = await User.findOne({email:email})
        if (adminUser.role !== "admin") {
            res.json({
                err:"You are not admin"
            })
        }
        else{
            next()
        }
    }


export default {Authmidlewares,isAdmin}