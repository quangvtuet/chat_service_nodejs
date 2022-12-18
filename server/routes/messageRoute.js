import express from "express";
import { allMessages, sendMessage, } from "../controllers/messageController.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/:chatId").get(authMiddleware, allMessages);
router.route("/").post(authMiddleware, sendMessage);

export default router;