const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../Models');

exports.login = async (req, res) => {

    try {
        console.log("Login request received:", req.body);

        const {email, password} = req.body;

        const user = await User.findOne({where: {email: email} });

        console.log(user);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.user_password);
        if (!isMatch) {
            
            return res.status(401).json({ message: 'Invalid password' });
        }

        if (user && isMatch) {
            const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';
            const token = jwt.sign({ id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email}, jwtSecret, { expiresIn: '5h' });
            return res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' })
                .status(200)
                .json({ 
                    message: 'Login successful', 
                    user: { 
                        id: user.id, 
                        firstname: user.firstname,
                        lastname: user.lastname, 
                        email: user.email 
                    } 
                });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  };