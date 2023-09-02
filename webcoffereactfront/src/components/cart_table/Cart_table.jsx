
import React, { useState,useEffect } from 'react'
import "./Cart_table.css"
import base64ArrayBuffer from '../../trans/Base64Trans';
import axios from 'axios';
axios.defaults.withCredentials = true
function Cart_table(props) {
 

  const proWish = props.proWish 
  const handleRemove = async(id)=>{
    props.handleRemove(id)
  }
  const handleChange = (id,e)=>{
    props.changeNum(id,e.target.value)
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
    {console.log("prowish",props.proWish)}
      { proWish && proWish.map((item)=>{
        return(
            <tr>
                <td>
              <div className="cart__info">
                <img src={`data:image/jpeg;base64,${base64ArrayBuffer(item.product.image.data.data)}`} alt="" />
                {
                    props.type && props.type ==="checkOut" ?
                    <div className="cart__des">
                    <p >{item.product.title}</p>
                    <span style={{cursor:"default"}}>{item.product.description}</span>
                  </div> :
                   <div className="cart__des">
                   <p>{item.product.title}</p>
                   <span onClick={()=>handleRemove(item.product._id)}>Remove</span>
                  </div>
                
                }
               
              </div>
            </td>
            <td>
              {props.type == "checkOut"?
              <input value ={item.number} style={{textAlign:"center"}} disabled/>
              :
              <input value ={item.number} style={{textAlign:"center"}} type='number' onChange={(e)=>handleChange(item._id,e)}/>
              }
              
            </td>
            <td className="cart__page--price">{item.product.price}</td>
            </tr> 
       
        )
      }) }


  </tbody>
</table>
</div>

  )
}

export default Cart_table