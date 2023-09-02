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
  let [proWish,setProWish] = useState([])
  const [totalPrice,setTotalPrice] = useState()
  const [user,setUser] = useState({})
  const [suc,setSuc] = useState(true)
  let User = JSON.parse(localStorage.getItem("User"))

  useEffect(()=>{
    checkLogin() 
    getAUser()
    getCart()
  },[])

  const getAUser = async()=>{
    const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
    console.log("getAUser",result);
    if(result.data.status == "success"){  
        setUser(result.data.user)
    }
  }
  const getCart = async()=>{
    const result = await axios.get('http://localhost:8000/api/cart')
    if (result) {
      setTotalPrice(result.data.cartList.totalPrice)
      setProWish(result.data.cartList.products)
    }
  }

  const checkLogin = async()=>{
  const result = await axios.get("http://localhost:8000/api/page/checkOut",{ withCredentials: true })
  
  if(result.data.status != "success"){
    setSuc(!suc)
    loadPage() 

  }
  else
  {
    setSuc(true)
  }
  }
  const loadPage = ()=>{
      window.location = 'login'
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

  }
    const headline = "Thanh toán"

    const [showModel,SetShowModel] = useState(false)
    const handleShow = ()=>{
      SetShowModel(!showModel)
    }
  return (
    <>
          <Navbar user={user} handleLogOut={handleLogOut}/>
        {
          console.log(proWish)
        }
        <Navbar_sub headline={headline}/>
        {proWish && <Cart_table proWish = {proWish} type = "checkOut"/>}
        
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
         {
          totalPrice ?     
         (<td>{totalPrice + 20000}</td>  ) :<td></td> 
         }
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