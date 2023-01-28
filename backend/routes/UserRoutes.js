import express from "express";
import { getAll, register } from "../controller/UserController.js";

const router = express.Router();

router.post("/", register);

export default router;
