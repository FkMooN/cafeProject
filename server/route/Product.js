import express from 'express'
import ProductCtrl from "../controllers/ProductCtrl.js"
import Authmidlewares from '../middlewares/Authmidlewares.js'
import upload from '../middlewares/Upload.js'


const router = express.Router()
router.get('/',ProductCtrl.getAllProduct)
router.get('/cate',ProductCtrl.getCate)
router.get('/search/:title',ProductCtrl.searchProduct)
router.get('/:id',ProductCtrl.getAProduct)
router.post('/',Authmidlewares.Authmidlewares,Authmidlewares.isAdmin,upload.single("image"),ProductCtrl.createProduct)
router.put('/:id',Authmidlewares.Authmidlewares,Authmidlewares.isAdmin,ProductCtrl.updateProduct)
router.post('/add',Authmidlewares.Authmidlewares,ProductCtrl.addToWishlist)
router.delete('/del/:product',Authmidlewares.Authmidlewares,ProductCtrl.removeToWishlist)
router.delete('/:id',Authmidlewares.Authmidlewares,Authmidlewares.isAdmin,ProductCtrl.deleteProduct)
export default router

;