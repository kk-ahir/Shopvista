const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, email, password, inviteToken } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check invite token (only if provided)
        let isAdmin = false;

        if (inviteToken) {
            if (inviteToken === process.env.ADMIN_INVITE_TOKEN) {
                isAdmin = true;
            } else {
                return res.status(401).json({ message: "❌ Invalid admin invite token" });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin,
        });

        await newUser.save();

        res.status(201).json({ message: "✅ User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    register,
    login
};
