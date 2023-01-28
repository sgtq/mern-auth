import jwt from "jsonwebtoken";

import User from "../model/User.js";

export const verifyToken = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // separate 'Bearer' and take next string as token

            // decode jwt token
            const decoded = jwt.verify(String(token), process.env.SECRET);

            // find User for Id, without password attribute
            req.user = await User.findById(decoded.id).select("-password");

            next(); // continue to next function after this middleware
        } catch (error) {
            res.status(401).json({
                error: "Not Authorized. Authentication failed.",
                description: error.message,
            });
            throw new Error("Not Authorized. Authentication failed.");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not Authorized. No Token");
    }
};
