import { Navigate } from "react-router-dom";
import "../CSS/productCard.css";
import SingleProducts from "../pages/SingleProductPage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../pages/Api.js"; // Import the API instance


function ProductCard({ product }) {
const navigate = useNavigate();

  

  function likeProduct() {
    alert("Product liked!");
  }

  function HandleProductClick() {
    navigate(`/product/${product.productId}`);
  }

  async function HandleCartClick() {
    
    // Check what user is logged in
    const user = await api.get("/profiles", { withCredentials: true })

    if(!user){
      alert("You need to be logged in to add to cart!")
    }

      console.log(user.data.user.id);

    const cartItem = {
      userId: user.data.user.id,
      productId: product.productId,
      quantity: 1,
    };
    
    
    await api.post("/cart", cartItem, { withCredentials: true })
      .then((response) => {
        console.log("Item added to cart:", response.data);
        alert("Item added to cart!");
        
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
        alert("Failed to add item to cart.");
      });

  }

  return (
    <div className="flex flex-wrap justify-center z-40">
      <div className="product-card border border-cream h-full m-4 rounded-lg shadow-xl bg-brown/60 hover:translate-y-[-8px] transition-transform duration-300 ease-in-out">
        <div className="  p-2 relative aspect-[1/1] w-full " onClick={HandleProductClick}>
          <img
            className="rounded-xl  w-full h-full md:max-w-[400px] object-cover "
            src={`/Images/${product.image}`}
            alt={product.productName}
          />

          <div className="absolute bg-linear-to-b from-stone-950/10 to-stone-950/80 opacity-0 hover:opacity-100 top-0 left-0 right-0 bottom-0 h-full flex flex-col justify-end transition-opacity duration-300">
            <button className="absolute top-[1.5rem] right-[1.5rem] text-slate-50 p-0.5 bg-amber-200/50 size-[40px] rounded-4xl hover:bg-amber-200/80 hover:text-pink-400 active:text-red-600" onClick={likeProduct}>
              ♥
            </button>
          </div>

          
        </div>
        <div className="product-info px-5">
            <h3>{product.productName}</h3>
            <p>{`£${product.price}`}</p>
            
        </div>
        <button className="bg-amber-200/50 hover:bg-amber-200/80 active:bg-amber-200/100 text-slate-50 p-2 w-full rounded-b-lg" onClick={HandleCartClick}>Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
