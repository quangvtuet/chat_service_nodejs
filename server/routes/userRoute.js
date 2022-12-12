import express from "express";
const router = express.Router();
import {
    userRegister,
    userLogin,
    userLogout
} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

router.post('/user-register', userRegister);
router.post('/user-login', userLogin);
router.post('/user-logout', authMiddleware, userLogout);


export default router;