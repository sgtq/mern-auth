import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: `${process.env.TOKEN_TIMEOUT}m` }); // HS256 is default
};
