import React, { useEffect, useState } from "react"

import { BrowserRouter as Router,
    Switch,
    Route,
    Link } from "react-router-dom"
import Home from "./routes/Home/Home"
import Product from "./routes/Product/Product"
import InfoProduct from "../src/routes/InfoProduct/InfoProduct"
import Cart from "./routes/Cart/Cart"
import CheckOut from "./routes/CheckOut/CheckOut"
import Register from "./routes/Register/Register"
import Login from "./routes/Login/Login"
import Profile from "./routes/Profile/Profile"
import Dasboard from "./routes/Admin_dasboard/Dasboard"

import "./App.css"
import Order from "./routes/Order/Order"


const App = ()=>
{

    return (
        <Router> 
    <div className="App">
        <Switch>
            <Route  path="/" exact><Home/></Route>
            <Route path="/product"><Product/></Route>
            <Route path="/infoProduct/:id" ><InfoProduct/></Route>
            <Route path="/cart"><Cart/></Route>
            <Route path="/checkOut"><CheckOut/></Route>
            <Route path="/Register"><Register/></Route>
            <Route path="/Login"><Login/></Route>
            <Route path="/profile"><Profile/></Route>
            <Route path="/order"><Order/></Route>
            <Route path="/dasboard"><Dasboard/></Route>

        </Switch>

    </div>
        </Router>
     
    )
}
export default App