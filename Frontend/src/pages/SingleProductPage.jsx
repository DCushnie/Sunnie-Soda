import { useParams } from "react-router-dom";
import api from "../pages/Api.js"; // Import the API instance
import { useState, useEffect } from "react";


function SingleProducts(){
    const { product_id } = useParams(); // Destructure the product_id from props
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get(`/products/${product_id}`) // Adjust the endpoint as needed
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the product:", error);
                setLoading(false);
            });
    }, [product_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <div className="single-product">
            <h1>{product.productName}</h1>
            <img src={`/Images/${product.image}`} alt={product.productName} />
            <p>{`£${product.price}`}</p>
            </div>
            <div className="button">
                <button className="add-to-cart">Add to Cart</button>
            </div>
            
        </>
        
    );
}

export default SingleProducts;