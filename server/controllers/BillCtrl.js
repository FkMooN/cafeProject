import Bill from "../model/Bill.js"
import User from "../model/User.js"
const getAllBills = async(req,res)=>{
    try {
        const result = await Bill.find()
        if (result) {
            res.json({
                bill:result,
                status:"success",
                message:"Trả sản phẩm thành công"
            })
        }
        else{
            res.json({
                status:"fail",
                message:"Trả sản phẩm thất bại"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
const getABill = async(req,res)=>{

}
const getBillUser = async(req,res)=>{
    
}
const createBill = async(req,res)=>{    
    const {_id} = req.user
    try { 
        const user = await User.findById(_id)
        req.body.product.map(async(element)=>{
        const onCart = user.wishlist.find((item) => item.proId.toString() === element.proId)
        if(onCart){
                 await User.updateOne({_id},{
                $pull: { wishlist: {
                    proId:onCart
                } }
            },{new:true})
        }
        })  
        const result = await Bill.create(req.body)    
        if(result){
            res.json({
                status:"success",
                message:"Mua hàng thành công",
                bill:result
            })
        }
    } catch (error) {
        console.log(error);
    }
  
    
}
const acceptBill = async(req,res)=>{
    const {id} = req.params
    try {
        const result = await Bill.findByIdAndUpdate(id,
            {
            billCode:1,
             billDes:"Đã duyệt đơn"   
            },{new:true})
        if(result){
            res.json({
                status:"success",
                message:"Duyệt đơn hàng thành công",
                bill:result
            })
        }
        else{
            res.json({
                status:"fail",
                message:"Duyệt đơn hàng thất bại",
                bill:result
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const cancelBill = (req,res)=>{

}
export default {getAllBills,getABill,getBillUser,createBill,acceptBill,cancelBill}