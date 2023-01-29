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

    const token = generateToken(user._id);

    res.cookie(String(user._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 24 * 3), // miliseconds, minute, hours, days (3 days total)
        httpOnly: true,
        sameSite: "lax",
    });

    res.status(201).json({
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        token: token,
    });
};
