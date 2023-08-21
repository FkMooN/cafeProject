import React, { useState,useEffect } from 'react'
import "../Register/Register.css"
import Banner from "../../assets/slider.jpg"
import axios from 'axios'

function Profile() {
    const [user,setUser] = useState({
        userName:"",
        fullName:"",
        email:"",
        location:"",
        phone:""
    })

    const User = JSON.parse(localStorage.getItem("User"))

    useEffect(()=>{
        getAUser()
  },[])
  const getAUser = async()=>{

        const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
        if(result.data.status == "success"){
            setUser(result.data.user)
        }
        else{
            setUser({
                userName:"",
                fullName:"",
                email:"",
                location:"",
                phone:""
            })
        }

  }
  const handleUpdate = async(e)=>{
       e.preventDefault()
       const result = await axios.put(`http://localhost:8000/api/user/update-user/${User._id}`,user,{ withCredentials: true }) 
       if(result){
        console.log(result);
       }
       else{
        alert("Có gì đó không ổn r Đại Vương")
       }
  }
  
  return (
    <div className="log__main" style={{background:`url(${Banner})  top center / cover no-repeat`}}>
  <div className="form__main">
    {/* Registration */}
    <div className="form" id="form-regis">
      <span className="title">Tài Khoản</span>
      <form onSubmit={handleUpdate}>
        <div className="input__field">
          <i className="fa-regular fa-user icon" />
          <input
            type="text"
            value={user.userName ? user.userName:""}
            disabled="disabled"
            required=""
          />
        </div>
        <div className="input__field">
          <i className="fa-regular fa-user icon" />
          <input
            type="text"
            value={user.fullName?user.fullName:""}
            onChange={(e)=>{setUser({...user,fullName : e.target.value})}}
            placeholder="Tên đầy đủ"
            required=""
          />
        </div>
        <div className="input__field">
          <i className="fa-regular fa-envelope icon" />
          <input
            type="text"
            onChange={(e)=>{setUser({...user,email : e.target.value})}}
            
            value={user.email ? user.email:""}

            disabled="disabled"
            required=""
          />
        </div>
        <div className="input__field">
          <i className="fa-solid fa-phone icon" />
          <input
            type="text"
            onChange={(e)=>{setUser({...user,phone : e.target.value})}}
            value={user.phone?user.phone:""}
            placeholder="Nhập Số Điện Thoại"
            required=""
          />
        </div>
        <div className="input__field" style={{ marginBottom: 10 }}>
          <i className="fa-solid fa-location-arrow" />
          <input
            type="text"
            onChange={(e)=>{setUser({...user,location : e.target.value})}}
            value={user.location?user.location:""}
            placeholder="Sửa Địa Chỉ"
            required=""
          />
        </div>
        <span style={{ color: "red", fontSize: 12 }} />
        <div className="input__field button">
          <input type="submit" defaultValue="Hoàn Thành" />
        </div>
      </form>
    </div>
    {/* Registration */}
  </div>
</div>

  )
}

export default Profile