import React from 'react'
import "./Model.css"
import { useState,useEffect } from 'react';

function Model(props) {
    
    const user = props.user
    const [data, setData] = useState([])
    const [dis,setDis] = useState([])
    const [ward,setWard] = useState([])
    const [locationPlus,setLocationPlus]=useState("")
    const [proName,setProName] = useState("")
    const [disName,setDisName] = useState("")
    const [wardName,setWardName] = useState("")
    const [location,setLocation] = useState("")
    const [fullName,setFullName] = useState(user.fullName)
    const [phone,setPhone] = useState(user.phone)

    useEffect(()=>{
        fetchData()
  },[])

  const fetchData = async()=>{
    const response = await fetch("https://provinces.open-api.vn/api/?depth=3");
    const data = await response.json()
    setData(data)
    setDis(data[0].districts)
    setWard(data[0].districts[0].wards)
  }
  const setProOnchange = (e)=>{
    data.map((item)=>{
        if(e.target.value == item.code){    
            setDis(item.districts)
            setWard(item.districts[0].wards)
            setProName(item.name.toString())
            setDisName("")
            setWardName("")
        }
        if(e.target.value == -1){
            setProName("")

        }
        
    })
  }
  const setDisOnchange = (e)=>{
    dis.map((item)=>{
        if(item.code == e.target.value){
            setWard(item.wards)
            setDisName(item.name)
            

        }
        if(e.target.value == -1){
            setDisName("")
        }
    })
  }
  const setWardOnchange =(e)=>{
    ward.map((item)=>{
        if(item.code == e.target.value){
           setWardName(item.name)
        }
        if(e.target.value == -1){
            setWardName("")
        }
    })
  }
  const handleAccept = ()=>{
    if(proName && disName && wardName){
    setLocationPlus(proName+","+disName+","+wardName)  
    }
    else{
      alert("Vui lòng nhập đủ các trường")
    }

  }
 const handleShow = (type)=>{

    setLocationPlus("")
 }


  return (

    <div className="modal">
  <div className="modal__container">
    <div className="modal__container-address">
      <h2>Địa Chỉ Mới</h2>
      <div className="modal__container-form">
        <div className="modal__container-form_per">
          <input
            className="modal__container-form_name"
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e)=>{setFullName(e.target.value)}}
          />
          <input
            className="modal__container-form_phone"
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}

          />
        </div>
        <div className="modal__container-form_add">
       <div onClick={
        handleShow
        }>
       <input
            className="modal__container-form_province"
            type="text"
            placeholder="Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã"
            value={locationPlus}
            disabled={true}
         
          />
       </div>
      
      
       
          <div className="modal__container-form_add-address">
          <input 
           className="modal__container-form_pro-spe"
            type="text"
            placeholder={"Địa Chỉ Cụ Thể"}
            onFocus={(e)=>{
              setLocation("")
            }}
            onBlur={(e)=>{
              if(!e.target.value)
              {
                alert("Vui lòng nhập đầy đủ địa chỉ")
                setLocation("")
              }
              else
              {
                setLocation(e.target.value+","+locationPlus)
              }
            }}
          >
          </input>  
          <span className='modal__container-form_pro-spe_span'>{locationPlus}</span>

        
   
            {!locationPlus && locationPlus =="" && <div className="modal__container-form_add-address_control">
            <select
              className="form-select__province form-select"
              aria-label="Default select example"
              onClick={(e)=>setProOnchange(e)}

            > 
          <option className = "form-select__province-option" value="-1">--Chọn Tỉnh/Thành Phố--</option>
              {data && data.length>0 && data.map(item=>{
                  return(
                   <option className = "form-select__province-option" value={item.code}>{item.name}</option>

                  )
              })}

            </select>
            <select
              className="form-select__dis form-select"
              aria-label="Default select example"
              onClick={(e)=>setDisOnchange(e)}

            >
                <option className = "form-select__province-option" value="-1">--Chọn Quận/Huyện--</option>

            {dis && dis.length>0 && dis.map(item=>{
                  return(
                   <option className = "form-select__province-option" value={item.code}>{item.name}</option>
                  )
           
            })} 
              

            </select>
            <select
              className="form-select__wards form-select"
              aria-label="Default select example"
              onClick={(e)=>setWardOnchange(e)}
            >
              <option className = "form-select__province-option" value="-1">--Chọn Phường/Xã--</option>
              {ward && ward.length>0 && ward.map(item=>{
     
                  return(
                   <option className = "form-select__province-option" value={item.code}>{item.name}</option>
                  )
              })}

            </select>
            <button onClick={handleAccept} style={{
              border: "1px solid grey",
              padding:" 8px",
              height: "40px"
            }}>Ok</button>
          </div>}
           
        </div>
        </div>
      </div>
    </div>
    <div className="modal__container-button">
      <button type="button" onClick={()=>props.handleSubmit()}>Trở Lại</button>
      <button type="button" onClick={()=>props.handleSubmit(fullName,phone,location,"submit")}>Hoàn Thành</button>
    </div>
  </div>
</div>

  )
}

export default Model