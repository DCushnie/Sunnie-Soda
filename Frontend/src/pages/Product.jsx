import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import axios from "axios";


function ShowProducts() {
  const [searchProductsQuery, setSearchProductsQuery] = useState(""); //this is the search query that will be used to search for products
  const [myproducts, setmyproducts] = useState([]); //this is the state that will hold the products

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products") //this sends a get request to the backend to get the products

      .then((response) => setmyproducts(response.data)) //this sets the products to the data gotten from the backend

      .catch((error) =>
        console.log("There was an error getting products: ", error)
      ); //this logs the error if there is any
  }, []); //this makes sure that the products are gotten only once when the page is loaded

  const handleSearch = (e) => {
    e.preventDefault(); //prevents the page from refreshing when the form is submitted
    alert(searchProductsQuery);
    setSearchProductsQuery(""); //this clears the search bar after submission
  };

  return (
    <>
    <div className="bg-radial from-cream to-mutedemerald overflow-y-scroll h-dvh w-dvw relative">
        <div className="overflow-hidden relative">
        <img src="../Images/image 1.png" alt="background" className="absolute h-full w-full object-cover z-0 pointer-events-none"/>
        <div className="absolute border-4 border-cream h-[120dvh] w-[115dvh] rounded-[100%] top-[5.5rem] right-[-25rem] z-0"></div>
        <div className="absolute border-4 border-cream h-[150dvh] w-[175dvh] rounded-[100%] top-[-3rem] right-[-25rem] z-0"></div>
        </div>
       
    <form onSubmit={handleSearch} className="search-form z-40">
        <input
          type="text"
          placeholder="Search products"
          classname="search-input z-40"
          value={searchProductsQuery}
          onChange={(e) => setSearchProductsQuery(e.target.value)} //this will stop the search bar from clearing itself after submission
        />
        <button type="submit" className="search-btn">
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
