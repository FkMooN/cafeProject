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
  const [totalPrice,setTotalPrice] = useState(0)
  const [user,setUser] = useState({})
  let User = JSON.parse(localStorage.getItem("User"))
  
  let idStorage 
  if(JSON.parse(localStorage.getItem("wishItem"))){
     idStorage = JSON.parse(localStorage.getItem("wishItem")).proId._id
     
  }

  useEffect(()=>{
    checkLogin()  
    if(idStorage){
      if(proWish.length<=0){
        proWish.push(JSON.parse(localStorage.getItem("wishItem")))
      }
      setProWish(proWish) 
      setUser(User)
    }
    else{
      getAUser()
    } 
    setUser(User)
  },[proWish])

  const getAUser = async()=>{
    const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
    console.log("getAUser",result);
    const products = result.data.user.wishlist
    if(result.data.status == "success"){  
        setUser(result.data.user)
        setProWish(products)
    }
  }


  const checkLogin = async()=>{
  const result = await axios.get("http://localhost:8000/api/page/checkOut",{ withCredentials: true })
  
  if(result.data.status === "fail"){
    window.location = '/login'
  }
  else{
    window.location = '/'
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
          proWish.totalPrice ?     
         (<td>{proWish[0].totalPrice + 20000}</td>  ) :<td>20000</td> 
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