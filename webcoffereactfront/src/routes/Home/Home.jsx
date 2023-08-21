import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Header from "../../container/Header"
import TopPro from "../../components/TopPro/TopPro"
import axios from 'axios'




function Home() {
  const [topPro,setTopPro] = useState([])
  const [user,setUser] = useState({})
  let User = JSON.parse(localStorage.getItem("User"))
  
  
  useEffect(() => {
    getTopPro()
    getAUser()
  },[]);
  const getAUser = async()=>{
    const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
    if(result.data.status == "success"){
        setUser(result.data.user)
       
    }
  }
  const getTopPro = async()=>{
    const result = await axios.get("http://localhost:8000/api/product?limit=4&sort=-sold")
    if(result){
     setTopPro(result.data.product)
    }
   }
   const handleLogOut = async()=>{
    const result = await axios.get('http://localhost:8000/api/user/logout',{ withCredentials: true })
    if(result){
      localStorage.clear();
      setUser({})
    }
  }
  return (
    <div>
    
           <Navbar user={user} handleLogOut={handleLogOut}></Navbar>     
            <Header></Header>
            <TopPro topPro={topPro}></TopPro>

    </div>
  )
}

export default Home