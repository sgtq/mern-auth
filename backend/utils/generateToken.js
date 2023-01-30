import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" }); // HS256 is default
};
