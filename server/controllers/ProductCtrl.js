import Product from "../model/Product.js"
import Category from "../model/Category.js"
import User from "../model/User.js"
import slugify from "slugify"

const getAllProduct = async(req,res)=>{
    const queryObj ={...req.query}
    console.log("queryObj: ",queryObj);
    const excludeFields = ["page","sort","limit","fields"]
    excludeFields.forEach((el)=> delete queryObj[el])
    let queryStr = JSON.stringify(queryObj);
    // filter product
     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`)
    //  Sort product
     let query =  Product.find(JSON.parse(queryStr))
    if(req.query.sort){
       const sortBy = req.query.sort.split(",").join(" ")
       query.sort(sortBy)
    }else{
        query.sort("-createdAt")
    }
    if(req.query.fields){
       const selectBy = req.query.fields.split(",").join(" ")
       query.select(selectBy)
    }
    else{
       query.select("-__v")

    }
    if(req.query.limit){
        query.limit(req.query.limit)
     }
    const product = await query
    if(product){
    res.json({
        product:product,
        mess:"Tìm sản phẩm thành công"})
   
    }
}    
   

const getAProduct = async(req,res)=>{
    
    const {id}= req.params
    const product = await Product.findById({_id:id})
    if(product){
        res.json({
            product:product,
            mess:"Trả sản phẩm thành công"})
       
    }
    else{
        res.json({
            product:product,
            mess:"Sản phẩm không tồn tại"})
    }
}   

const getCate = async(req,res)=>{
    const cate = await Category.find()
    if(cate){
        res.json({
            category:cate,
            mess:"Trả phân loại thành công"
        })
    }
}
const createProduct = async(req,res)=>{

    let slug
    const {title,description,price,quantity} = req.body
    try {
        if(req.body.title){
            slug = slugify(req.body.title)
        }
        console.log(req.file);

        const newProduct = await Product.create({
            title:title,
            slug:slug,
            description:description,
            price:price,
            quantity:quantity,
            image:{
                data:req.file.buffer,
                contentType:req.file.mimetype
            }
        })
        if(newProduct){
            res.json({
                newProduct:newProduct,
                mess:"Tạo mới thành công"
            })
        }
    } catch (error) {
        console.log(error);
    }
    



}

const updateProduct = async(req,res)=>{
    const newPros = req.body
    if(req.body.title){
        req.body.slug = slugify(req.body.title)
    }   
    const {id} = req.params
    try {
        const updateProduct = await Product.findOneAndUpdate({_id:id},
            newPros,{new:true})
        if(updateProduct){
            res.json({
                updateProduct:updateProduct,
                mess:"Cập nhật sản phẩm thành công"
            })
        }
        else{
            res.json({
            
                mess:"Cập nhật sản phẩm thất bại"
            })
        }
    } catch (error) {
        console.log(error);
    }
    
}

const deleteProduct =  async(req,res)=>{
    const {id} = req.params
    try {
        const delProduct = await Product.findByIdAndDelete(id)
        if(delProduct){
            res.json({
                delProduct: delProduct,
                mess:"Xóa sản phẩm thành công"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
    const searchProduct = async(req,res)=>{
        const title = req.params.title 
        console.log(title);
        const result = await Product.find({
            title:{$regex : new RegExp('^'+title+'.*','i')}
          })
        if(result){
            res.json({
                result: result
            })
        }
        else{
            res.json({
                status:'fail',
                message:"Có j ko ổn r Đại Zương"
            })
        }
    }

    const addToWishlist = async(req,res)=>{
        const {product ,number} = req.body
        const {_id} = req.user
            const user = await User.findById(_id)
            const allReadyAdd = user.wishlist.find((item) => item.product.toString() === product)
            const getPrice = await Product.findById(product).select("price").exec()  
            const price = getPrice.price
            if(allReadyAdd){
                res.json({
                    message:"Đã có sản phẩm tồn tại trong giỏ hàng",    
                    status:"fail"
                })
            }
            else{
                
                let user = await User.findByIdAndUpdate({_id},{
                    $push: { 
                        wishlist: {
                      product,
                     number,
                     price
                    } },

                },{new:true})
                res.json({
                    message:"Đã thêm sản phẩm vào giỏ hàng",
                    status:"success",
                    user:user
                })
            }
    }
    const removeToWishlist = async(req,res)=>{
        const {product} = req.params
        const {_id} = req.user
        
            const user = await User.findById(_id)
            const allReady = user.wishlist.find((item) => item.product.toString() === product)
            
            if(!allReady){
                res.json({  
                    message:"Không tồn tại sản phẩm",
                    status:"fail"
                })
            }
            else{
                let user = await User.updateOne({_id},{
                    $pull: { wishlist: {
                        product
                    } }
                },{new:true})
                res.json({
                    message:"Đã xóa sản phẩm khỏi giỏ hàng",
                    status:"success",
                    user:user
                })
            }

    }
    
export default {getAllProduct,getAProduct,createProduct,updateProduct,deleteProduct,getCate,searchProduct,addToWishlist,removeToWishlist}