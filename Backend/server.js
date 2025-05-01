// to run this file use the coomand node server.js in bash console

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt"); //this is for hasing the password
const { sequelize } = require("./Models");
const {Product, User, CartItem} = require("./Models");
const dotenv = require("dotenv");
const protectedRoutes = require("./routes/protectedRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow specific origin
    methods: "GET,POST",
    credentials: true, // Allow cookies to be sent with requests
  })
);




app.use("/api", protectedRoutes);
app.use("/api/auth", authRoutes);
app.use("/cart", protectedRoutes);

// 

//const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`);

// sequelize.authenticate()
// .then(() => {
//     console.log('Connection has been established successfully.');
// })
// .catch(error => {
//     console.error('Unable to connect to the database:', error);
// });

// Model for the tables in the database

// const Product = sequelize.define('Product', {
//     productId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     productName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     price: {
//         type: DataTypes.DECIMAL,
//         allowNull: false
//     },
//     image: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     amount: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     prodDescr: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
// },  {
//         timestamps: false,

// });

// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     firstname: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastname: {
//         type: DataTypes.STRING,
//         allowNull: true
//     }
//     ,
//     email: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     user_password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },

// }, {
//     timestamps: false
// });

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});




// ************** get requests **************

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/api/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/api/cart/:userId", async (req, res) => {
    try{

        const userId = req.params.userId;

        const cartItems = await CartItem.findAll({
            where: {
                user_id: userId
            },
            include: [{
                model: Product,
                as: 'product',
                attributes: ['productName','price','image']
            },],
        });

        const cartSummary = cartItems.map(item => ({
                productName: item.product.productName,
                price: item.product.price,
                quantity: item.quantity,
                totalPrice: item.quantity * item.product.price
            }));

            res.json(cartSummary);
    }catch(error){
        res.status(500).send({error: "Server error", details: error.message});
        };
    });


// ************** post requests **************
//********************************************

app.post("/api/cart", async (req, res) => {
    try{
        const {userId, productId, quantity} = req.body;

        const existingItem = await CartItem.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        });

        if(existingItem){
            await existingItem.update({
                quantity: existingItem.quantity + quantity
            });
            return res.json({message: "quantity updated"});
        }else{
            await CartItem.create({
                user_id: userId,
                product_id: productId,
                quantity
            });
            return res.json({message: "Item added to cart"});
        }

    }catch(error){
        res.status(500).send({error: "Server error", details: error.message});
    }
});



//for hashing the password

const hashPassword = async (password) => {
  //this salt and hasshes the user's password Hashing makes passwords one-way (irreversible).
  //Salting adds a random unique value to each password before hashing to prevent attackers from using precomputed rainbow attacks
  //  Salting ensures that even if two users have the same password, their stored hashes will be different.

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// for creating a new user

app.post("/api/users", async (req, res) => {
  try {
    const { firstname, lastname, email, user_password } = req.body;

    // Validate required fields
    if (!firstname || !user_password) {
      return res
        .status(400)
        .json({ error: "Firstname and password are required." });
    }

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
});

// see what port the server is running on

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
