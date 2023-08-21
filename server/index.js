import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import User from '../server/model/User.js'
import Auth from '../server/route/Auth.js'
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import slugify from "slugify"
import Product from "./route/Product.js"
import Page from "./route/Page.js"
import Bill from './route/Bill.js'

const app = express()
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.set("view engine","ejs")
const PORT = process.env.PORT||8000
app.use(express.json())
app.use(cookieParser())

mongoose.connect('mongodb://127.0.0.1:27017/coffeeShop')
app.get('/upload',(req,res)=>{
    res.render("upload.ejs")
})
app.use('/api/user',Auth)
app.use('/api/product',Product)
app.use('/api/page',Page)
app.use('/api/bill',Bill)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.listen(PORT, ()=>{console.log(`server is runing at ${PORT}`);})
