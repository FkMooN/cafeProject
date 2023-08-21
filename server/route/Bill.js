import express from 'express'
import Authmidlewares from '../middlewares/Authmidlewares.js'
import BillCtrl from '../controllers/BillCtrl.js'
const router = express.Router()
router.get('/',Authmidlewares.Authmidlewares,Authmidlewares.isAdmin,BillCtrl.getAllBills)
router.get('/:id',Authmidlewares.Authmidlewares,Authmidlewares.isAdmin,BillCtrl.getABill)
router.get('/user',Authmidlewares.Authmidlewares,BillCtrl.getBillUser)
router.post('/',Authmidlewares.Authmidlewares,BillCtrl.createBill)
router.put('/:id',Authmidlewares.Authmidlewares,Authmidlewares.isAdmin,BillCtrl.acceptBill)
router.delete('/:id',Authmidlewares.Authmidlewares,Authmidlewares.isAdmin,BillCtrl.cancelBill)
export default router