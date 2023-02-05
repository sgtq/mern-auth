import express from "express";
import { login, logout } from "../controller/AuthController.js";
import { getUser } from "../controller/UserController.js";
import { refreshToken, verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/refresh", refreshToken, verifyToken, getUser);

export default router;
