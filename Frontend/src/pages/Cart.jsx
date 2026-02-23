import { useState, useEffect } from "react";
import api from "./Api.js";
import { useNavigate } from "react-router-dom";

const Cart = () =>{
    const [userCart, setuserCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const user = await api.get("/profiles", { withCredentials: true })

                    if(!user){
                        alert("You need to be logged in to add to cart!")
                        }


                    console.log(user.data.user.id);
                const res = await api.get(`/cart/${user.data.user.id}`, {
                    withCredentials: true, // Include credentials in the request
                })
                .catch((error) => {
                    console.error("Error adding item to cart:", error);
                    alert("Failed to add item to cart.");
                });
                console.log(res.data);
                setuserCart(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            {userCart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {userCart.map((item) => (
                        <li key={item.productId}>
                            <h2>{item.productName}</h2>
                            <img src={`/Images/${item.image}`} alt={item.productName} />
                            <p>{`£${item.price}`}</p>
                            <p>Quantity: {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;