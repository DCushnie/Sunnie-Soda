// Desc: Main entry point for the frontend
//To run this project use npm run dev
import { Routes, Route } from 'react-router-dom';
import './CSS/App.css';

import Profile from './pages/sample';
import ShowProducts from './pages/Product';
import HeroPage from './pages/Hero-page';
import SignUp from './pages/SignUp';
import Login from './pages/login';
import SingleProducts from './pages/SingleProductPage';
import Cart from './pages/Cart';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';


function App() {
  

  return (
    <>

      <main className='main-content'>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/sample" element={<Profile />} />
          <Route path="/showproducts" element={<ShowProducts />} />
          <Route path="/product/:product_id" element={<SingleProducts />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      
    </>
  )
}



export default App
