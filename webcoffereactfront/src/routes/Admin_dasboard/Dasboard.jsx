import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Navbar_sub from '../../components/navbar_Sub/Navbar_sub'
import Cate from '../../components/cate/Cate'
import axios from 'axios'
import "./Dasboard.css"
function Dasboard() {
  const [user,setUser] = useState({})
  let User = JSON.parse(localStorage.getItem("User"))
  
  
  useEffect(() => {

    getAUser()
  },[]);
  const getAUser = async()=>{
    const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
    if(result.data.status == "success"){
        setUser(result.data.user)
       
    }
  }
  const handleLogOut = async()=>{
    const result = await axios.get('http://localhost:8000/api/user/logout',{ withCredentials: true })
    if(result){
      localStorage.clear();
      setUser({})
    }
  }
  const adminSideBar =[
    {
      name :"Quản lý đơn hàng",
      link :"order",
    },
    {
      name :"Quản lý người dùng",
      link :"user",
    },
    {
      name :"Quản lý sản phẩm",
      link :"product",
    },
    {
      name :"Thêm sản phẩm",
      link :"add-product",
    }
  ]
  const headline = "Đơn hàng"
  return (
    <div>
           <Navbar user={user} handleLogOut={handleLogOut} type={"dasboard"}></Navbar>   
           <Navbar_sub type={"admin"}
      headline={headline}/>  
           <section className="container section-1 text-center ">
    <div className=" row">
    <div className="col-md-2 cate-list__product">
      {
            adminSideBar && adminSideBar.map((item)=>{
              return(
                <Cate name={item.name} link ={item.link}/>
              )
            })
      }
    </div>
    <div className="row col-md-10">
      <ul class="module__statu row" style={{display: "flex",listStyleType: "none",margin:"4px 0","padding": "0",fontSize: "14px",cursor: "pointer",height:"40px"}}>
      <>
  <li
    data-value={6}
    className="col-4 active"
    style={{
      width: "33.33337%",
      display: "flex",
      alignItems: "center",
      padding: "0 6px"
    }}
  >
    Đang đợi xác nhận
    <span style={{ color: "red" }}>
      
    </span>
  </li>
  <li
    data-value={0}
    className="col-4"
    style={{
      width: "33.33337%",
      display: "flex",
      alignItems: "center",
      padding: "0 6px"
    }}
  >
    Đã duyệt đơn
   
  </li>
  <li
    data-value={1}
    className="col-4"
    style={{
      width: "33.33337%",
      display: "flex",
      alignItems: "center",
      padding: "0 6px"
    }}
  >
    Đã hủy đơn
    <span style={{ color: "red" }}>
     
    </span>
  </li>

</>

              
      </ul>
    </div>
  </div>
</section>
      
    </div>
  )
}

export default Dasboard