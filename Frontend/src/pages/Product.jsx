import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "./Api.js";
import Navbar from "../components/Navbar.jsx";


function ShowProducts() {
  const [searchProductsQuery, setSearchProductsQuery] = useState(""); //this is the search query that will be used to search for products
  const [myproducts, setmyproducts] = useState([]); //this is the state that will hold the products

  useEffect (() => {
    api
      .get("/products")

      .then((response) => setmyproducts(response.data))
      .catch((error) => {
        console.error("There was an error fetching all the products:", error)
      })
  }, [])


  const handleSearch = (e) => {
    e.preventDefault(); //prevents the page from refreshing when the form is submitted
    alert(searchProductsQuery);
    setSearchProductsQuery(""); //this clears the search bar after submission
  };

  return (
    <>
    
    <div className="bg-radial from-cream to-blue-400/70 overflow-y-scroll h-dvh w-dvw relative">
      <Navbar className="bg-transparent"/>
        <div className="overflow-hidden relative">
        <img src="../Images/image 1.png" alt="background" className="absolute h-full w-full object-cover z-0 pointer-events-none"/>
        <div className="absolute border-4 border-cream h-[120dvh] w-[115dvh] rounded-[100%] top-[5.5rem] right-[-25rem] z-0"></div>
        <div className="absolute border-4 border-cream h-[150dvh] w-[175dvh] rounded-[100%] top-[-3rem] right-[-25rem] z-0"></div>
        </div>
       
    <form onSubmit={handleSearch} className="search-form z-40 mt-12 flex flex-row justify-center items-center">
        <input
          type="text"
          placeholder="Search products"
          className="search-input z-40 border-1 border-blue-800 focus:border-yellow-200 focus:outline-none w-2xs p-1 rounded-xl"
          value={searchProductsQuery}
          onChange={(e) => setSearchProductsQuery(e.target.value)} //this will stop the search bar from clearing itself after submission
        />
        <button type="submit" className="search-btn font-semibold bg-amber-200 rounded-2xl px-6 py-2 ml-8 hover:bg-amber-200/50 hover:text-white cursor-pointer">
          Search
        </button>
      </form>

      <div classname="">
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] px-[15rem]"> 
          {myproducts
            .filter((product) =>
              product.productName
                .toLowerCase()
                .startsWith(searchProductsQuery.toLowerCase())
            )
            .map((product) => (
              <ProductCard key={product.productId} product={product}/> //this enumarates through the values in products and returns a product card for each product
            ))}
        </div>
      </div>
    </div>
      
    </>
  );
}

export default ShowProducts;
