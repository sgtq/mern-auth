import User from "../model/User.js";

export const getById = async (req, res) => {
    const userId = req.id;

    let user;
    try {
        user = await User.findById(userId, "-password");
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error getting User.",
            description: error.message,
        });
        return new Error(error);
    }

    if (!user) {
        return res.status(401).json({
            error: "User not found.",
        });
    }

    res.status(201).json(user);
};

export const register = async (req, res) => {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ message: "missing required data." });
    }

    try {
        const userExists = await User.findOne({
            email: email,
        });

        if (userExists) {
            return res.status(400).json({ message: "user already exists." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error finding User." });
    }

    try {
        const user = await User.create(req.body); // on save, User own model function bcrypts password

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving User." });
    }
};
