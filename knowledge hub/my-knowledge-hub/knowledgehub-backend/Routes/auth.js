const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.post(
  "/register",
  [
    check("username", "Username must be at least 3 characters").isLength({ min: 3 }),
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user with email or username already exists
      let existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email or username already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "secretkey", {
        expiresIn: "1h",
      });

      res.status(201).json({ token });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: "Server error: " + err.message });
    }
  }
);

module.exports = router;
