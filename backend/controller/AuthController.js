import mongoose from "mongoose";
import User from "../model/User.js";

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

    res.status(201).json({
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
    });
};
