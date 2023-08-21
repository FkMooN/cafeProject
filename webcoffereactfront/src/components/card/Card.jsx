import React from 'react'
import "./Card.css"
import base64ArrayBuffer from "../../trans/Base64Trans"
function Card(props) {

  const item = props.item
  const handleClickPro = props.handleClickPro
  const handleShowPro = (id)=>{
    handleClickPro(id)
  }
  return (
    <div className="card" style={{ width: "100%" }} onClick={()=>handleShowPro(item._id)}>
    <img src={`data:image/jpeg;base64,${base64ArrayBuffer(item.image.data.data)}`} className="card-img-top" alt="..." />
    <div className="card-body">
      <h1 className="card-title">{item.title}</h1>
      <p className="card-sub">{item.description}</p>
      <div className="card__price d-flex">
        <p>{item.price}</p>
        <div className="card_status d-flex">
          <p className="card_status_des">đã bán</p>
          <p className="quantities">{item.sold}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Card