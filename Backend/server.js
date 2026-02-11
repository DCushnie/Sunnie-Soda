// to run this file use the comand "node server.js" in bash console

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt"); //this is for hasing the password
const { sequelize } = require("./Models");
const {Product, User, CartItem} = require("./Models");
const dotenv = require("dotenv");
const protectedRoutes = require("./routes/protectedRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());

app.use(express.json());


app.use(
  cors({
    origin: process.env.CORS_FRONTEND_URL, // Allow specific origin
    methods: ["GET","POST"],
    credentials: true, // Allow cookies to be sent with requests
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  })
);

app.options("*", cors());





app.use("/api", protectedRoutes);
app.use("/api/auth", authRoutes);
app.use("/cart", protectedRoutes);
app.use("/api", adminRoutes);



// sequelize.sync({ alter: true }).then(() => {
//   console.log("Database & tables created!");
// }).catch(error => {
//   console.error('Unable to connect to the database:', error);
// });




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



// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// });

// app.get("/api/cart/:userId", async (req, res) => {
//     try{

//         const userId = req.params.userId;

//         const cartItems = await CartItem.findAll({
//             where: {
//                 user_id: userId
//             },
//             include: [{
//                 model: Product,
//                 as: 'product',
//                 attributes: ['productName','price','image']
//             },],
//         });

//         const cartSummary = cartItems.map(item => ({
//                 productName: item.product.productName,
//                 price: item.product.price,
//                 quantity: item.quantity,
//                 totalPrice: item.quantity * item.product.price
//             }));

//             res.json(cartSummary);
//     }catch(error){
//         res.status(500).send({error: "Server error", details: error.message});
//         };
//     });


// ************** post requests **************
//********************************************

app.get("/health", (req, res) => res.json({ ok: true }));






// for creating a new user

// app.post("/api/users", async (req, res) => {
//   try {
//     const { firstname, lastname, email, user_password } = req.body;

//     // Validate required fields
//     if (!firstname || !user_password) {
//       return res
//         .status(400)
//         .json({ error: "Firstname and password are required." });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ where: { email: email } });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await hashPassword(user_password);

//     // Create a new user in the database
//     const newUser = await User.create({
//       firstname,
//       lastname,
//       email,
//       user_password: hashedPassword,
//     });

//     // Respond with the newly created user
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });

// see what port the server is running on

app.listen(port || 3000, () => {
  console.log(`Server is running on port ${port}`);
});

sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .then(() => sequelize.sync()) // IMPORTANT: remove alter:true for production
  .then(() => console.log("Database synced"))
  .catch((error) => {
    console.error("DB startup error:", error);
    // do NOT process.exit() for now; keep server alive so /health works
  });
