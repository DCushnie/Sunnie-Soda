const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../Models');


exports.GetUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
      } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
      }
}

//for hashing the password

const hashPassword = async (password) => {
  //this salt and hasshes the user's password Hashing makes passwords one-way (irreversible).
  //Notes: Salting adds a random unique value to each password before hashing to prevent attackers from using precomputed rainbow attacks
  // Notes: Salting ensures that even if two users have the same password, their stored hashes will be different.

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.CreateUser = async (req, res) =>{
    try {
        const { firstname, lastname, email, user_password, } = req.body;
    
        // Validate required fields
        if (!firstname || !user_password || !email) {
          return res
            .status(400)
            .json({ error: "Firstname and password are required." });
        }
    
        console.log("user is:" ,User)
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
        }
    
        const hashedPassword = await hashPassword(user_password);
    
        // Create a new user in the database
        const newUser = await User.create({
          firstname,
          lastname,
          email,
          user_password: hashedPassword,
        });
    
        // Respond with the newly created user
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
    
}