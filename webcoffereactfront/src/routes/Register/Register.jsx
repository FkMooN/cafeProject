import React, { useState } from 'react'
import "./Register.css"
import Banner from "../../assets/slider.jpg"
import axios from 'axios'
function Register() {
  const [data,setData] = useState({
    userName:'',
    email:'',
    password:'',
  })

  const [show, setShow] = useState(false)
  const setAttriPass = ()=>{
    setShow(!show)

  }
  const RegisterUser = async(e)=>{
    e.preventDefault()
    
    const result = await axios.post('http://localhost:8000/api/user/register-user',{...data})
    if(result){
      if(result.data.status == "success")
      {
        window.location = "/login"
      }
      else{
        alert(result.data.mess)
      }
    }
    else{
    }
   
    }
  return (


        <div className="log__main" style={{background:`url(${Banner})  top center / cover no-repeat`}}>
  <div className="form__main">
    {/* Registration */}
    <div className="form" id="form-regis">
      <span className="title">Đăng Kí</span>
      <form onSubmit={RegisterUser}>
        <div className="input__field">
          <i className="fa-regular fa-user icon" />
          <input type="text" placeholder="Nhập tên đăng nhập" required="" value={data.userName} onChange={(e)=>setData({...data,userName:e.target.value})}/>
        </div>
        <div className="input__field">
          <i className="fa-regular fa-envelope icon" />
          <input type="email" placeholder="Nhập Gmail" required="" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
        </div>
        <div className="input__field">
          <i className="fa-solid fa-lock icon" />
          <i className={show ? "fa-regular fa-eye show-hide-icon":"fa-regular fa-eye-slash show-hide-icon"} onClick={setAttriPass}/>
          <input
            className="password"
            type={show ? 'text' : 'password'}
            placeholder="Nhập mật khẩu"
            required=""
            value={data.password}
            onChange={(e)=>setData({...data,password:e.target.value})}
          />
        </div>
        <div className="input__field">
          <i className="fa-solid fa-lock icon" />
          <input
            className="password"
            type={show ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu"
            required=""
            
          />
        </div>
        <button className="input__field button" type='submit'>
          <input type="button" defaultValue="Đăng Kí" />
        </button>
      </form>
      <div className="login-signup">
        <span className="text disable">
          Có Tài Khoản?
          <a className="sign signin" href="/login">
            <b>Đăng Nhập Ngay</b>
          </a>
        </span>
      </div>
    </div>
    {/* Registration */}
  </div>
</div>


  )
}

export default Register