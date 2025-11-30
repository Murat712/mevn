import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { checkValidationErrors } from "../utlis/index.js";
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { email } = req.body;
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res
                .status(400)
                .json({ error: "This email is already exist!" });
        }

        const newUser = await User.create(req.body);
        newUser.password = undefined;
        return res
            .status(201)
            .json({ message: 'User created succesfully', user: newUser })
    } catch (error) {
        if (error.name === 'ValidationError') {
            if (checkValidationErrors(error, res)) return;
        }
        else {
            console.error("error at register", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ error: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res
                .status(401)
                .json({ error: "wrong password" });
        }

        user.password = undefined;

        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWR_EXPIRE_TIME })
        return res.status(200).json({ message: 'User logined in successfullt', user, token });
    } catch (error) {
        if (error.name === 'ValidationError') {
            if (checkValidationErrors(error, res)) return;
        }
        else {
            console.error("error at login", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export { register, login };