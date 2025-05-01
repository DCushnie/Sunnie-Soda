const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
        req.user = decoded; // Attach the decoded user data to the request object
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

