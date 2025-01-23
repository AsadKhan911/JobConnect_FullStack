import express from 'express'
const router = express.Router()
import { register, login, updateProfile, logout } from '../controllers/user.controllers.js'; 
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';  


router.route('/register').post(singleUpload , register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/profile/update').put(isAuthenticated , singleUpload , updateProfile)

export default router;