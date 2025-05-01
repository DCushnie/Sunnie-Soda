const express = require('express');
const { authenticateToken } = require('../middleware/authmiddleware');
const jwt = require('jsonwebtoken');
const { HandleCart, GetCart } = require('../controllers/cartcontroller');

const router = express.Router();
console.log("Protected routes loaded");

router.get("/profiles", authenticateToken, (req, res) => {
    try {
        // Extract the token from the cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');

        // Send the user data to the frontend
        res.status(200).json({
            message: "Welcome to the protected route!",
            user: {
                id: decoded.id,
                firstname: decoded.firstname,
                lastname: decoded.lastname,
            },
        });
    } catch (error) {
        console.error("Error decoding token:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

router.post("/cart", authenticateToken, HandleCart);
router.get("/cart/:userId", authenticateToken, GetCart);
module.exports = router;