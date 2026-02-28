
# 🛒 Sunnie Soda E-Commerce Web App

> An e-commerce platform for Sunnie Soda, making healthy drinks the new trend! Shop, manage, and explore with style.

---

## 🚀 Overview

Welcome to the Sunnie Soda E-Commerce Web App! This project is a modern, full-stack shopping experience featuring a React + Vite frontend and a robust Node.js/Express backend. Whether you’re here to browse, buy, or just poke around, you’ll find a blend of performance, security, and a sprinkle of fun.

Live Website: [https://sunniesoda.co.uk/](https://sunniesoda.co.uk/)

---

## 🧩 Features

- 🛍️ **Product Catalog**: Browse a variety of Sunnie Soda products with detailed pages.
- 🛒 **Cart System**: Add, remove, and manage your cart items with ease.
- 🔐 **Authentication**: Secure sign-up, login, and protected routes for users and admins.
- 🧑‍💼 **Admin Controls**: Manage products and users (admin only!).
- 🎨 **Modern UI**: Built with React, Tailwind CSS, and 3D/animated touches using Three.js and GSAP.
- ⚡ **Fast & Responsive**: Powered by Vite for instant reloads and smooth navigation.

---

## 🏗️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Three.js & @react-three/fiber (for 3D/animated components)
- GSAP (animations)
- React Router DOM

### Backend
- Node.js & Express
- Sequelize ORM (MySQL/SQLite)
- JWT Authentication
- Bcrypt (password hashing)
- CORS, dotenv, cookie-parser

---

## 📁 Project Structure

```
ecommerce-web/
├── Backend/
│   ├── Models/           # Sequelize models (User, Product, CartItems)
│   ├── controllers/      # Route controllers (auth, cart, user)
│   ├── middleware/       # Auth/admin middleware
│   ├── routes/           # Express routes (auth, admin, protected)
│   ├── server.js         # Express app entry point
│   └── package.json      # Backend dependencies
│
├── Frontend/
│   ├── src/
│   │   ├── components/   # React components (Navbar, ProductCard, etc.)
│   │   ├── pages/        # Page components (Login, Cart, Product, etc.)
│   │   ├── CSS/          # Stylesheets
│   │   └── assets/       # Images, 3D assets
│   ├── public/           # Static files
│   ├── index.html        # App entry
│   └── package.json      # Frontend dependencies
```

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/DCushnie/Sunnie-Soda.git
cd ecommerce-web
```

### 2. Backend Setup

```bash
cd Backend
npm install
Set up your .env file
npm start
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev

```

---

## 🌟 Fun Facts

- The frontend features 3D/animated product displays for a fun and cool shopping vibe.
- Built with a sprinkle of humor and a dash of code wizardry.

---

Happy shopping & happy coding! 🛒✨


