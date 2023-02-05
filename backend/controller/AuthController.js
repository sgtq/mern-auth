import jwt from "jsonwebtoken";
import User from "../model/User.js";

import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "missing required data." });
    }

    let user;
    try {
        user = await User.findOne({ email });
    } catch (error) {
        res.status(500).json({ error: error.message });
        throw new Error(error);
    }

    // verify password against User on model function
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: "invalid credentials." });
    }

    if (req.cookies.access_token) {
        req.cookies.access_token = "";
    }

    const token = generateToken(user._id);

    res.cookie("access_token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * process.env.TOKEN_TIMEOUT), // miliseconds, minute, hours, days (3 days total)
        httpOnly: true,
        sameSite: "lax",
    })
        .status(201)
        .json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            token: token,
        });
};

export const logout = (req, res, next) => {
    const oldToken = req.cookies.access_token;
    if (!oldToken) {
        return res.status(401).json({ message: "Token not found" });
    }

    jwt.verify(String(oldToken), process.env.SECRET, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: "Authentication failed." });
        }

        res.clearCookie("access_token");
        req.cookies["access_token"] = "";
        return res.status(200).json({ message: "Logged out" });
    });
};
