import Cart from "../model/Cart.js"
import Product from "../model/Product.js"
const addToCart = async(req,res)=>{
    const {cart} = req.body
    const {_id} = req.user
    const products = []
  
    for (let i = 0; i< cart.length; i++) {
        let object = {}
        object.product = cart[i]._id
        object.number = cart[i].number   
        let getPrice = await Product.findById(cart[i]._id).select("price").exec()
        object.price = getPrice.price
        products.push(object)
    }
    let totalPrice = 0
    for (let i = 0; i < products.length; i++) {
        totalPrice = totalPrice + products[i].number*products[i].price 
    }
    try {
        const allReadyCart = await Cart.findOne({user:_id})
        if(allReadyCart){
            await Cart.deleteOne({user:_id})
        }
        let cart = new Cart({
                user:_id,
                products:products,
                totalPrice:totalPrice
            }).save()
            if(cart) {
                res.json({
                    status:"success",
                    message:"Thêm vào danh sách sản phẩm thành công",
                    cart:cart,
                })
            }
            else{
                res.json({
                    status:"failed",
                    message:"Thêm vào danh sách sản phẩm thất bại",
                })
            }
    
      
    } catch (error) {
        console.log(error);
    }
    
}

const getUserCart = async(req,res)=>{
    try {
        
        const {_id} = req.user
        const cartList = await Cart.findOne({user:_id}).populate('products.product')
        if(cartList){
            res.json({
                status:"success",
                message:"Trả sản phẩm thành công",
                cartList:cartList
            })
        }
        else{
            res.json({
                status:"failed",
                message:"Trả sản phẩm thất bại",
               
            })
        }

    } catch (error) {
        
    }
}
export default {addToCart,getUserCart}