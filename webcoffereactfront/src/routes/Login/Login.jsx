import React,{useState} from 'react'
import "../Register/Register.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from "../../assets/slider.jpg"
function Login() {
    
    const [data,setData] = useState({
        email:'',
        password:'',
      })
      const [show, setShow] = useState(false)
      const setAttriPass = ()=>{
        setShow(!show)
    
      }
      axios.defaults.withCredentials = true

      const LoginUser = async (e)=>{
       e.preventDefault()
       try {
       const result = await axios.post('http://localhost:8000/api/user/login',{...data},{ withCredentials: true })
        if(result){
          console.log(result.user);
          if (result.data.status == "success") {
            localStorage.setItem("User", JSON.stringify(result.data.user));
            window.history.back();
          }
          else{
            alert(result.data.mess)
          }
        }
        else{
            alert('Có gì đó không ôn rồi đại vương ơi')
        }
       } catch (error) {
        console.log(error);
       }
      }
  return (
    <div className="log__main" style={{background:`url(${Banner})  top center / cover no-repeat`}}>
   
  <div className="form__main">
    {/* login */}
    <div className="form active" id="form-login">
      <span className="title">Đăng Nhập</span>
      <form onSubmit={LoginUser}>
        <div className="input__field">
          <i className="fa-regular fa-user icon" />
          <input type="email" placeholder="Nhập email" required="" value={data.email} onChange={(e)=>setData({...data, email: e.target.value})}/>
        </div>
        <div className="input__field">
          <i className="fa-solid fa-lock icon" />
          <i className={show ? "fa-regular fa-eye show-hide-icon":"fa-regular fa-eye-slash show-hide-icon"} onClick={setAttriPass}/>
          <input
            className="password"
            type={show ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            required=""
            value={data.password} onChange={(e)=>setData({...data, password: e.target.value})}
          />
        </div>
        <button className="input__field button" type='submit'>
          <input type="button" defaultValue="Đăng Nhập" />
        </button>
      </form>
      <div className="login-signup">
        <span className="text disable">
          Chưa Có Tài Khoản?
          <a className="sign signup" href="/register">
            <b>Đăng Kí Ngay</b>
          </a>
        </span>
      </div>
    </div>
    {/* login */}
  </div>
</div>

  )
}

export default Login