import express from "express";
import { getById, register } from "../controller/UserController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getById); // verifyToken as middleware
router.post("/", register);

export default router;
