import User from "../model/User.js";

export const getAll = async (req, res) => {
    //
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "missing data." });
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
        res.status(500).json({ message: "Error finding existing User." });
    }

    try {
        const user = await User.create(req.body); // on save, User own model function bcrypts password

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving User." });
    }
};
