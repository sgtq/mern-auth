import express from "express";
import { getUser, register } from "../controller/UserController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getUser); // verifyToken as middleware
router.post("/signup", register);

export default router;
