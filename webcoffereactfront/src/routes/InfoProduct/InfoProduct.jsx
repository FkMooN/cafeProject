import React, { useEffect, useState } from 'react'
import "./InfoProduct.css"
import Navbar from '../../components/navbar/Navbar'
import Navbar_sub from '../../components/navbar_Sub/Navbar_sub'
import coffeeTN from "../../assets/coffeeTN.jpg"
import {  useParams } from 'react-router-dom';
import base64ArrayBuffer from '../../trans/Base64Trans'
import axios from 'axios'

function InfoProduct(props) {
  let { id } = useParams()
  const [pro,setPro] = useState()
  const [user,setUser] = useState({})
  let [quantity,setQuantity] = useState(1)
  
  let User = JSON.parse(localStorage.getItem("User"))

  useEffect(()=>{

    getAPro(id)
  },[])

  useEffect(()=>{
    getAUser()
  },[])

  const getAUser = async()=>{

    const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
    if(result.data.status == "success"){
        setUser(result.data.user)
    }
    else{
      setUser({})
  
    }
  }
  const getAPro = async(id)=>{
    const result = await axios.get(`http://localhost:8000/api/product/${id}`)  
    if(result){
      setPro(result.data.product)
    }

  }
  const handleChange = (type)=>{
    switch (type) {
      case "minus":
        if(quantity>=2){
          setQuantity(quantity-=1)
        }
        break;
        case "plus":
          setQuantity(quantity+=1)
          break;
    
      default:
        break;
    }
  }
  axios.defaults.withCredentials = true
  const cookie = {
    name: 'refreshToken',
    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDIxNGM3MTc3YWQzZDE4NWFhOWQ4ZCIsImlhdCI6MTY5MTk5MjIwMywiZXhwIjoxNjkyMjUxNDAzfQ.4yuR0dMMnIjxw-Ht2lNsuogKajdpe2uMMYCoGF4X-fU",
    SameSite: 'none',
    Secure: true,
  };
  const handleAddCart = async(id,quantity)=>{
      const result = await axios.post(`http://localhost:8000/api/product/add/`,
      {product:id,
      number:quantity
    },
      {withCredentials: true,
      cookies: [cookie],
      })
      if(result.data.status == "success")
      {
        alert(result.data.message)
      } 
      if(result.data.status == "fail")
      {
        if(result.data.message == "missing token"){
          window.location = "/login"
        } 
        else{
          alert(result.data.message)
        }
      }
    
  }

  const handleCheckout = async(id,quantity)=>{
    if(user._id){
      const cart = [
        {
          _id:pro._id,
          number:quantity
        }
        
      ]
      const result =  await axios.post('http://localhost:8000/api/cart',
      {
        cart
      },
      { withCredentials: true })
      if (result) {
        window.location = `/checkOut`    
      }
    }
    else{
       window.location = '/login'
    }
  }
  const handleLogOut = async()=>{
    const result = await axios.get('http://localhost:8000/api/user/logout',{ withCredentials: true })
    if(result){
      localStorage.clear();
      setUser({})
    }
  }
  const headline = "Chi tiết sản phẩm"
  return (
    
    <div className='infoProduct'>

    <Navbar user={user} handleLogOut ={handleLogOut}/>
    <Navbar_sub
    headline={headline}/>
    {pro  && 
    <div className="container container__product">
           <div className="row">
             <div className="col-md-7" style={{height:"424px"}}>
            
              
                  
                     <img
                       src={`data:image/jpeg;base64,${base64ArrayBuffer(pro.image.data.data)}`}
                       style={{width:"100%",height:"100%",objectFit:"contain"}}
                      />
           

             </div>
             <div className="col-md-5 container__product--info d-flex flex-column">
               <p className="container__product--name">
                {pro.title}
               </p>
               <div className="container__product--review d-flex">
                 <div
                   className="container__product--reviewStar"
                   style={{ paddingRight: 10, color: "orange" }}
                 >
                   <i className="fa-solid fa-star" />
                   <i className="fa-solid fa-star" />
                   <i className="fa-solid fa-star" />
                   <i className="fa-solid fa-star" />
                   <i className="fa-solid fa-star" />
                 </div>
                 <div
                   className="container__product--NumSel d-flex"
                   style={{ paddingLeft: 10 }}
                 >
                   <span className="product--NumSel">{pro.sold}</span>
                   <p style={{ color: "#888" }}>Đã Bán</p>
                 </div>
               </div>
               <span
                 className="container__product--price"
                 style={{ fontSize: "2rem", color: "red", fontWeight: 600 }}
               >
                  {pro.price}
               </span>
               <p className="container__product--des" style={{ fontSize: "1.6rem" }}>
                  {pro.body}
               </p>
               <div
                 className="container__product--buyNumbers mt-  auto"
                 style={{ fontSize: "1.6rem", alignItems: "center" }}
               >
                 <div className="btn-group" role="group" aria-label="Basic example">
                   <button type="button" className="Btn_change btn btn-light" onClick={()=>handleChange("plus")}>
                     <i className="fa-solid fa-plus" />
                   </button>
                   <span className="product--buyNumbers">{quantity}</span>
                   <button type="button" className="Btn_change btn btn-light"  onClick={()=>handleChange("minus")}>
                     <i className="fa-solid fa-minus" />
                   </button>
                 </div>
               </div>
             </div>
           </div>
           <div className="row justify-content-end">
             <div className="col-md-5">
               <div className="container__product--choice">
                 <button className="container__product--addCart"  onClick={()=>handleAddCart(pro._id,quantity)}>
                   <i className="fa-solid fa-cart-plus" />
                   Thêm Vào Giỏ Hàng
                 </button>
                 <button className="container__product--buy" onClick={()=>handleCheckout(pro._id,quantity)}>Mua ngay</button>
               </div>
             </div>
           </div>
 </div>}
</div>


  )
}

export default InfoProduct