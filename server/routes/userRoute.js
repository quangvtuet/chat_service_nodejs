import express from "express";
const router = express.Router();
import {
    userRegister,
    userLogin,
    userLogout,
    allUsers
} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

router.get('/', authMiddleware, allUsers);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', authMiddleware, userLogout);

export default router;