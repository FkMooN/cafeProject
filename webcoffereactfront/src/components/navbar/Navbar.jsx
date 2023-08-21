import React from 'react'
import "./Navbar.css"
import { FaSearch,FaUserAlt,FaShoppingCart,FaBars,FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.jpg"
import Cate from '../cate/Cate';
import { useState ,useEffect} from 'react';
import axios from 'axios';

function Navbar(props) {
  const [cate,setCate]= useState([])
  
  const [proShow,setProShow] = useState([])
  let User = JSON.parse(localStorage.getItem("User"))
  const user = props.user

  useEffect(()=>{
    getCate()

},[])

  const getCate = async()=>{
    const result = await axios.get("http://localhost:8000/api/product/cate")
    if(result){
      setCate(result.data.category)
    }
   }
   const handleSearch = async(e)=>{
      const value = e.target.value.trim()
      if(!value){
        setProShow([])
      }
      else{
        const result = await axios.get(`http://localhost:8000/api/product/search/${value}`)
        if(result){
        setProShow(result.data.result)
        }
      }
   
   }
   const handleChoose = (id)=>{   
      window.location = `/infoProduct/${id}`
   }
   const handleLogOut = async()=>{
      props.handleLogOut()
   }
  
  return (
  
      <div className="web__navbar ">
      <a className="web__navbar-brand" href="/">
                <img  src={logo} alt=""/>
                <span>Roku Coffee</span></a>

      <div className="web__navbar-links">
        {props.type !=="dasboard" &&
        <ul className="web__navbar-list">
        <li className="web__navbar-item">
          <a href="/" className="web__navbar-list_link">Trang Chủ</a>
        </li>
        <li className="web__navbar-item">
          <a className="web__navbar-list_link">Loại</a>
          <div className="web__navbar-item_cate row">
            {cate && cate.map((item)=>{
              return(
                <div className="web__navbar-item_cate-item col-md-4">
                <Cate name={item.cateName}/>
              </div>  
              )
            })} 
          </div>
         
        </li>
        <li className="web__navbar-item">
          <a href="/product" className="web__navbar-list_link">Sản Phẩm</a>
        </li>
     
      </ul>
        }
      
      <div class="web__navbar-search">
          <input className="navbar__search--form form-control"type="text" placeholder="Tìm kiếm" aria-label="default input example" onChange={(e)=>handleSearch(e)}/>
          <FaSearch color='#fff'  size='20px' cursor='pointer'/>  
          <ul class="navbar__search-list">
         {proShow && proShow.map((item)=>{
          return (
          <li className='navbar__search-item' onClick={()=>handleChoose(item._id)}>{item.title}</li>
          )
          })}      
        
      </ul>
      </div>
      
      {props.type !== "dasboard" &&
       <a href="/cart" className="web__navbar-cart">
       <FaShoppingCart color='#fff'  size='20px'/>
      </a>
      }
      
        <div className='web__navbar-user'>
          <FaUserAlt color='#fff'  size='20px'/>
          <ul class="navbar__user-dropdown_list">
                    <li >Chào Mừng <b>{ user._id ? user.userName : "Guest"}</b>
                      </li>
                      {user._id && <li><a href='/profile' >Tài Khoản</a></li>}
                      {user._id && <li><a href="/order">Đơn hàng</a></li>}
                      {!user._id && <li><a href="/login">Đăng nhập</a></li>}
                      {user._id && <li onClick={handleLogOut}><a>Đăng xuất</a></li>}
                     
            </ul>
        </div>
       
      </div>
                
      </div>
    
  )
}

export default Navbar