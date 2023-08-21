import React from 'react'
import "./Navbar_sub.css"
function Navbar_sub(props) {
  return (
    <div className="navbar__sub">
  <div className="container-fluid">
    <div className="navbar__sub--intro">
      <h1 className="nav__sub--item"> {props.type !== "admin" ? "Trang Chủ":"Dasboard"}</h1>
     
      
      <i
        className="fa-sharp fa-solid fa-arrow-right"
        style={{ fontSize: 20 }}
      />
      <h1 className="nav__sub--item">{props.headline}</h1>
    </div>
  </div>
</div>

  )
}

export default Navbar_sub