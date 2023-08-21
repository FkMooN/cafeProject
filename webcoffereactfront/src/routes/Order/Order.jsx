import { useState,useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import Navbar_sub from '../../components/navbar_Sub/Navbar_sub'
function Order() {
  const [user,setUser] = useState({})
  let User = JSON.parse(localStorage.getItem("User"))
  useEffect(()=>{

    getAUser()
},[])
const getAUser = async()=>{
    const result = await axios.get(`http://localhost:8000/api/user/${User._id}`,{ withCredentials: true })
    if(result.data.status == "success"){

        setUser(result.data.user)
    }
  }
  const headline = "Giỏ hàng"
  return (
    <>
       <Navbar user = {user}></Navbar>
       <Navbar_sub
      headline={headline}/>
      <div className='container'>
      <ul class="module__statu row" style={{display: "flex",listStyleType: "none",margin:"4px 0","padding": "0",fontSize: "14px",cursor: "pointer",height:"40px"}}>

<li
data-value={6}
className="col-4 active"
style={{
    width: "16.66666666666667%",
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
    width: "16.66666666666667%",
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
    width: "16.66666666666667%",
    display: "flex",
    alignItems: "center",
    padding: "0 6px"
}}
>
Đã hủy đơn
<span style={{ color: "red" }}>

</span>
</li>     
<li
data-value={0}
className="col-4"
style={{
    width: "16.66666666666667%",
    display: "flex",
    alignItems: "center",
    padding: "0 6px"
}}
>   
Đang giao

</li>
<li
data-value={1}
className="col-4"
style={{
    width: "16.66666666666667%",
    display: "flex",
    alignItems: "center",
    padding: "0 6px"
}}
>
Đã giao
<span style={{ color: "red" }}>

</span>
</li>
<li
data-value={1}
className="col-4"
style={{
    width: "16.66666666666667%",
    display: "flex",
    alignItems: "center",
    padding: "0 6px"
}}
>
Giao thất bại
<span style={{ color: "red" }}>

</span>
</li>



    
</ul>

  <table style={{width:"100%"}}>
      <tr>
        <th>#</th>
        <th>Tên Người Nhận</th>
        <th>Địa Chỉ Giao</th>
        <th>Số điện thoại</th>
        <th>Sản Phẩm </th>
        <th>Ngày Đặt</th>
        <th>Tình Trạng</th>
        <th>Lựa Chọn</th>
      </tr>
      <tr>
        <td>1</td>
        <td>Long Văn</td>
        <td>Trung Của</td>
        <td>034455</td>
        <td>
            <button style={{width:"70%"}}>Xem</button>
        </td>
        <td>12-5-2022</td>
        <td>Đang chờ duyệt</td>
        <td>Lựa Chọn</td>
      </tr>

     

  </table>


      </div>
  

    </>
 
  )
}

export default Order