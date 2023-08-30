
import React, { useState,useEffect } from 'react'
import "./Cart_table.css"
import base64ArrayBuffer from '../../trans/Base64Trans';
import axios from 'axios';
axios.defaults.withCredentials = true
function Cart_table(props) {
  const [ message,setMessage] = useState("")
  const proWish = props.proWish 

  const handleRemove = async(id)=>{
    props.handleRemove(id)
  }
  return (

        <div className="container cart__page">
<table>
  <tbody>
    <tr>
      <th>Sản Phẩm</th>
      <th>Số lượng</th>
      <th>Giá</th>
    </tr>
    {console.log(props)}
      { proWish && proWish.map((item)=>{
        return(
            <tr>
                <td>
              <div className="cart__info">
                <img src={`data:image/jpeg;base64,${base64ArrayBuffer(item.proId.image.data.data)}`} alt="" />
                {
                    props.type && props.type ==="checkOut" ?
                    <div className="cart__des">
                    <p >{item.proId.title}</p>
                    <span style={{cursor:"default"}}>{item.proId.description}</span>
                  </div> :
                   <div className="cart__des">
                   <p>{item.proId.title}</p>
                   <span onClick={()=>handleRemove(item.proId._id)}>Remove</span>
                  </div>
                
                }
               
              </div>
            </td>
            <td>
              <input value={item.number} style={{textAlign:"center"}} disabled/>
            </td>
            <td className="cart__page--price">{item.proId.price}</td>
            </tr> 
       
        )
      }) }


  </tbody>
</table>
</div>

  )
}

export default Cart_table