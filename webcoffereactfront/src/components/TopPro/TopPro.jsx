import React from 'react'
import "./TopPro.css"
import Card from '../card/Card'
import coffeTN from "../../assets/coffeeTN.jpg"
function TopPro(props) {

  const topPro = props.topPro
  const handleClickPro = (id)=>{
    window.location = `/infoProduct/${id}`
   }

  return (

        <div className="section-1 text-center">
  <h1 className="section-1__title">MẶT HÀNG NỔI BẬT</h1>
  <div className="container">
    <div className="row">
      {
        topPro && topPro.map((item)=>{
         return(
          <div className="col-md-3 col-sm-6">
          <Card handleClickPro = {handleClickPro}
          coffeTN={coffeTN}
          item={item}
          />
        </div>
         )
        })
      }
   
    </div>
  </div>
</div>


  )
}

export default TopPro