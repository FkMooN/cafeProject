import React from 'react'
import "./CheckOut.css"
import Navbar from '../../components/navbar/Navbar'
import Navbar_sub from '../../components/navbar_Sub/Navbar_sub'
import Cart_table from '../../components/cart_table/Cart_table'
import CoffeeTN from "../../assets/coffeeTN.jpg"
import Model from '../../components/model/Model'
import { useState,useEffect } from 'react'
import {  useParams } from 'react-router-dom';
import axios from 'axios'

function CheckOut(props) {
  const [proWish,setProWish] = useState([])
  const [totalPrice,setTotalPrice] = useState(0)
  const [user,setUser] = useState({})
  let User = JSON.parse(localStorage.getItem("User"))
  
  let  id,number  
  if(JSON.parse(localStorage.getItem("wishItem"))){
     id = JSON.parse(localStorage.getItem("wishItem")).id
     number = JSON.parse(localStorage.getItem("wishItem")).quantity
  }

  useEffect(()=>{
    checkLogin()
    if(id && number){
      getPro(id) 
      getAUser()
    }
    else{
      getAUserPro()
      getAUser()
     
    }
  },[])
  const getAUserPro = async()=>{
    let sum = 0
    const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
    if(result.data.status == "success"){
        result.data.user.wishlist.map(async(item)=>{
          const  id =item.proId
          const  number = item.number
          // getProWish(item.proId,item.quantity)
          const res = await axios.get(`http://localhost:8000/api/product/${id}`)
          let product = res.data.product
          let total =  product.price*number
          setProWish((prev) => [...prev,{...product,number,total}])
          sum = sum + total
          setTotalPrice(sum)
        })
    }
  }
  const getAUser = async()=>{
    const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
    if(result.data.status == "success"){

        setUser(result.data.user)
    }
  }

  const getPro = async(id)=>{
    const result = await axios.get(`http://localhost:8000/api/product/${id}`)
    if(result){
      const product = result.data.product
      setProWish([{...product,number}])
      setTotalPrice(number * result.data.product.price)
    }
  }
  const checkLogin = async()=>{
  const result = await axios.get("http://localhost:8000/api/page/checkOut",{ withCredentials: true })
  
  if(result.data.status === "fail"){
    window.location = '/login'
  }


    
  }

  const handleLogOut = async()=>{
    const result = await axios.get('http://localhost:8000/api/user/logout',{ withCredentials: true })
    if(result){
      localStorage.clear();
      setUser({})
      window.location = "/"
    }
  }

  const handleSubmit = async(fullName,phone,location,type)=>{
    if(type === "submit"){
      const res = await axios.put(`http://localhost:8000/api/user/update-user/${user._id}`,
      {
        ...user,fullName,phone,location
      })
      if(res.data.status == "success")
      {
       
      }
      SetShowModel(!showModel)

    }
    else{
      SetShowModel(!showModel)

    }
    window.location.reload();
  }
    const headline = "Thanh toán"

    const [showModel,SetShowModel] = useState(false)
    const handleShow = ()=>{
      SetShowModel(!showModel)
    }
  return (
    <>
          <Navbar user={user} handleLogOut={handleLogOut}/>
  
        <Navbar_sub headline={headline}/>
        {proWish && proWish.length>0 && <Cart_table proWish = {proWish} type = "checkOut"/>}
        
        <div className="container total__price">
  <div className="check--out__address">
    <div className="check--out__address-header">
      <i className="fa-solid fa-location-dot" />
      <h2>Địa Chỉ Nhận Hàng</h2>
    </div>
    <p onClick={handleShow}>Sửa địa chỉ</p>
    <span>
      <b>Họ Và Tên: </b>{user.fullName};
    </span>
    <span>
   <b>Số điện thoại: </b>{user.phone};
    </span>
    <span>
      <b>Địa chỉ: </b>{user.location}; 
    </span>
  </div>
  <table>
    <tbody>
      <tr>
        <td>Phí Vận Chuyển</td>
        <td>20.000</td>
      </tr>
         <tr>
         <td>Tổng Cộng</td>
         <td>{totalPrice + 20000}</td>  
       </tr>
      
   
    </tbody>
  </table>
</div>
        <div class="container cart__page--check_out d-flex justify-content-end" >
        <button class="cart__page__btn-cart-check" ><a href="#">Mua Ngay</a></button>
        </div> 
    {showModel && <Model user = {user} handleSubmit={handleSubmit} handleShow={handleShow}/>
  }
    </>
  )
}

export default CheckOut