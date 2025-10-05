"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // adjust path if different
// SIGNUP
const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;
        // check if email already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // if username is provided, check if taken
        if (username) {
            const existingUsername = await User_1.default.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({ message: "Username already taken" });
            }
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({
            fullName,
            username: username || undefined, // optional
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.signup = signup;
// LOGIN
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body; // identifier = email OR username
        const user = await User_1.default.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid email/username or password" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email/username or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.login = login;
//# sourceMappingURL=userController.js.map