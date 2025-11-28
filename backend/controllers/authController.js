import mongoose from "mongoose";
import User from "../models/User.js";
import { checkValidationErrors } from "../utlis/index.js";

const register = async (req, res) => {
    try {
        const { email } = req.body
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

export { register };