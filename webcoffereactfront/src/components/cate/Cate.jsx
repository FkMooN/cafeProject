import React from 'react'
import "./Cate.css"
import{FaCaretRight} from "react-icons/fa";
const Cate = (props) => {
  const name = props.name

  return (
          <ul className="web__navbar-item_cate__container">
            <div> 
             <FaCaretRight/>
             <p>{name}</p>
            </div>
          </ul>
    
  )
}

export default Cate