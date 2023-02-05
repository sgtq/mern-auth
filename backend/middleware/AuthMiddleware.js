import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

export const verifyToken = async (req, res, next) => {
    /* ALTERNATE OPTION USING REGULAR JWT TOKENS */
    /*
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
	*/

    //////////////////////////////////
    /* USING COOKIES ON SERVER SIDE */
    const token = req.cookies.access_token;

    if (!token) {
        res.status(400).json({ error: "Not authorized. No token found." });
    }

    try {
        // decode and verify jwt token
        jwt.verify(String(token), process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token.", description: err.message });
            }

            req.id = user.id;
        });

        next(); // continue to next function after this middleware
    } catch (error) {
        res.status(401).json({
            error: "Not Authorized. Authentication failed.",
            description: error.message,
        });
        throw new Error("Not Authorized. Authentication failed.");
    }
};

export const refreshToken = async (req, res, next) => {
    const oldToken = req.cookies.access_token;

    if (!oldToken) {
        return res.status(400).json({ error: "No token found." });
    }

    jwt.verify(String(oldToken), process.env.SECRET, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ message: "Authentication failed" });
        }
        res.clearCookie("access_token");
        req.cookies["access_token"];

        const token = generateToken(data.id);

        res.cookie("access_token", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * process.env.TOKEN_TIMEOUT), // miliseconds, minute, hours, days (3 days total)
            httpOnly: true,
            sameSite: "lax",
        });

        req.id = data.id;
        next();
    });
};
