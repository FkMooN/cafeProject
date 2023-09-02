import React from 'react'
import Navbar from "../../components/navbar/Navbar"
import Card from '../../components/card/Card'
import Cate from '../../components/cate/Cate'
import axios from 'axios'

import "./Product.css"
import Navbar_sub from '../../components/navbar_Sub/Navbar_sub'
import { useState,useEffect } from 'react'
function Product() {

  const [allPro,setAllPro]= useState([])
  const [cate,setCate]= useState([])
  const [user,setUser] = useState({})
  let User = JSON.parse(localStorage.getItem("User"))

  useEffect(()=>{
      getAllPro()
      getCate()
      getAUser()
  },[])
  const handleProCate = ()=>{

  }
  const getAUser = async()=>{
    const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
    console.log(result);
    if(result.data.status == "success"){

        setUser(result.data.user)
    }
  }
  const getAllPro = async()=>{
      const result = await axios.get("http://localhost:8000/api/product")
      if(result){
        setAllPro(result.data.product)
      }
     }
     const getCate = async()=>{
      const result = await axios.get("http://localhost:8000/api/product/cate")
      if(result){
        setCate(result.data.category)
      }
     }
     const handleClickPro = (id)=>{
      window.location = `/infoProduct/${id}`
     }

     const handleSort = async(type)=>{
      const result = await axios.get(`http://localhost:8000/api/product/?sort=${type}`)
      setAllPro(result.data.product)
     }
  const headline = "Sản phẩm"
  return (  
    <div>
      <Navbar user = {user}/>
      <Navbar_sub
      headline={headline}/>
      <section className="container section-1 text-center ">
    <div className=" row">
    <div className="col-md-2 cate-list__product">
      {
        cate && cate.map((item)=>{
          return(
            <Cate handleProCate={handleProCate} name={item.cateName}/>
          )
        })
      }
    </div>
    <div className="row col-md-10">

    <div className="row__product-container ">
  <div className="row__product-container_sort">
    <p>Sắp xếp theo</p>
    <button className="btn_sale" onClick={()=>handleSort("-quantity")}>Bán Chạy</button>
    <div className="dropdown dropdown_price">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenu2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Giá
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
        <li>
          <button className="dropdown-item item__price btn_high" type="button" onClick={()=>handleSort("price")}>
            Thấp Đến Cao
          </button>
        </li>
        <li>
          <button className="dropdown-item item__price btn_low" type="button" onClick={()=>handleSort("-price")}>
            Cao Đến Thấp
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>

      { allPro && allPro.map((item)=>{
         return(
          <div className="col-md-3 col-sm-6" style={{marginBottom: "10px"}}>
          <Card item={item} handleClickPro={handleClickPro}/>
          </div>
         )
      })}
    </div>
  </div>
</section>

    </div>
  )
}

export default Product