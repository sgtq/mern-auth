import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors"; // this isn't called directly so Editor thinks it's not used.

import connect from "./utils/db_connect.js";

import UserRoutes from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: process.env.CLIENT_URI }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);

// Middleware

const server = app.listen(PORT, () => {
    connect();
    console.log("Server listening to port:", PORT.cyan);
});
