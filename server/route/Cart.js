import express from 'express'
import Authmidlewares from '../middlewares/Authmidlewares.js'
import CartCtrl from '../controllers/CartCtrl.js'
const router = express.Router()

router.post('/',Authmidlewares.Authmidlewares,CartCtrl.addToCart) 
router.get('/',Authmidlewares.Authmidlewares,CartCtrl.getUserCart)
export default router