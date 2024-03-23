import User from "../models/User.js";
import { signInValidator, signUpValidator } from "../validations/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotevn from "dotenv"

dotevn.config();

const SECRETE_CODE = process.env.SECRETE_CODE;

export const register = async (req, res) => {
    try {
        const { error } = signUpValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcryptjs.hash(req.body.password, 10);

        const user = await User.create({ ...req.body, password: hashedPassword });

        user.password = undefined;
        return res.status(200).json({ message: "Registration successful", user: user });

    } catch (error) {
        return res.status(500).json({ error: error.name, message: error.message });
    }
}

export const signIn = async (req, res) => {
    try {
        const { error } = signInValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: "Email not found" });

        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password mismatch" });

        const accessToken = jwt.sign({ _id: user._id }, SECRETE_CODE);

        user.password = undefined;
        return res.status(200).json({ message: "Login successful", user, accessToken });

    } catch (error) {
        return res.status(500).json({ error: error.name, message: error.message });
    }
}