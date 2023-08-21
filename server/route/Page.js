import express from 'express'
import Authmidlewares from '../middlewares/Authmidlewares.js'
import PageCtrl from '../controllers/PageCtrl.js'
const router = express.Router()

router.get('/checkOut',Authmidlewares.Authmidlewares,PageCtrl.checkOut)
export default router
