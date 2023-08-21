import React from 'react'
import Slider from "../assets/slider.jpg"
import "./Header.css"
const Header = () => {
  return (
    <div className='web__header d-flex' style={{ 
      background: `url(${Slider}) top center / cover no-repeat`, 
    }}>
           
           <div class="slider__intro text-center ">
            <h1 class="slider__title">
              Lorem, ipsum dolor.
            </h1>
            <h3 class="slider__sub">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
               Modi nesciunt dolor est dolores perferendis, esse officiis repudiandae voluptas, 
               fuga quo eius, dignissimos quidem excepturi.
            </h3>
            <button class="slider__btn btn btn-light"><a href='product'>Xem Mặt Hàng</a></button>
           </div>
    </div>
  )
}

export default Header