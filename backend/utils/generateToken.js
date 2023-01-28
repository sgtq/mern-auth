import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    const SECRET = process.env.SECRET;
    return jwt.sign({ id }, SECRET, { expiresIn: "1d" }); // HS256 is default
};
