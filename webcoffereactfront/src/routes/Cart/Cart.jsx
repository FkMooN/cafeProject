import React, { useState,useEffect } from 'react'
import "./Cart.css"
import Navbar from '../../components/navbar/Navbar'
import Navbar_sub from '../../components/navbar_Sub/Navbar_sub'
import CoffeeTN from "../../assets/coffeeTN.jpg"
import Cart_table from '../../components/cart_table/Cart_table'
import axios from 'axios'
function Cart() {
    const [pro,setPro] = useState([])
    const [user,setUser] = useState({})
    
    let User
    if(JSON.parse(localStorage.getItem("User"))){
      User = JSON.parse(localStorage.getItem("User"))
    }
    useEffect(()=>{
      getAUser()
    },[])
  
 
    const getAUser = async()=>{
      const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
      console.log("getAUser",result);
      const products = result.data.user.wishlist
      if(result.data.status == "success"){
          setUser(result.data.user)
          setPro(products)
      }
    }
    const changeNum = (id,value)=>{
      const newPro = [...pro]
      newPro.forEach((element, index) => {
        if(element._id === id) {
          element.number = value
        }
    }
    );
    
    setPro(newPro)
    }
   const handleRemove = async(id)=>{
    
    const res = await axios.delete(`http://localhost:8000/api/product/del/${id}`)
    if(res.data.status === "success"){
    let result = pro.filter((item)=>
    {
     return item.product._id !== id
    })
    setPro(result)
    }   
   }
    const handleCheckOut = async()=>{
      if(pro.length<=0){
        alert('vui lòng mua hàng trước khi thanh toán')
      }
      else{
        const cart = []
      
        for (let index = 0; index < pro.length; index++) {
          const object = {
            _id:pro[index].product._id,
            number:pro[index].number
  
          }
          cart.push(object) 
        }
        
        const result =  await axios.post('http://localhost:8000/api/cart',
        {
          cart
        },
        { withCredentials: true })
        if (result) {
          window.location = ('checkOut')
        }
  
    }
  
  }
    const handleLogOut = async()=>{
      const result = await axios.get('http://localhost:8000/api/user/logout',{ withCredentials: true })
      if(result){
        localStorage.clear();
        setUser({})
        setPro([])
      }
    }
    const headline = "Giỏ hàng"
  return (

        <>
        <Navbar user = {user} handleLogOut={handleLogOut}/>
        <Navbar_sub headline={headline}/>
        {
          console.log(pro)
        } 
        {pro && pro.length>0 && <Cart_table proWish = {pro} handleRemove={handleRemove} changeNum={changeNum}/>
      }
  <div className=" container cart__page--check_out d-flex justify-content-end">
    <button className="cart__page__btn-cart-check" onClick={handleCheckOut}>
          Mua Ngay
    </button>
  </div>
</>


  )
}

export default Cart