const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route example
router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Welcome to your profile, " + req.user.id,
        user: req.user,
    });
});

module.exports = router;
