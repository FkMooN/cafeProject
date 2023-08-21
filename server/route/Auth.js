import express from 'express'
import UserCtrl from '../controllers/UserCtrl.js'
import Authmidlewares from '../middlewares/Authmidlewares.js'
const router = express.Router()
router.post('/register-user',UserCtrl.RegisterUser)
router.post('/login',UserCtrl.LoginUser)
router.get('/logout',Authmidlewares.Authmidlewares,UserCtrl.LogoutUser)
router.get('/get-all-users',UserCtrl.getAllUser)
router.get('/refreshToken',UserCtrl.handleRefresh)
router.get('/:id',Authmidlewares.Authmidlewares,UserCtrl.getUser)       
router.delete('/delete-user/:id',Authmidlewares.Authmidlewares,UserCtrl.deleteUser)
router.put('/update-user/:id',Authmidlewares.Authmidlewares,UserCtrl.updateUser)
export default router