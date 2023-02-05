import express from "express";
import { login } from "../controller/AuthController.js";
import { getUser } from "../controller/UserController.js";
import { refreshToken, verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/refresh", refreshToken, verifyToken, getUser);

export default router;
