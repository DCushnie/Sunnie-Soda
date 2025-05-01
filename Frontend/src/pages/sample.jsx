import { useState, useEffect } from "react";
import api from "./Api.js";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/profiles", {
                    withCredentials: true, // Include credentials in the request
                });
                console.log(res.data);

                setUser(res.data.user);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return <div>{user ? <h2>Welcome, User {user.firstname}</h2> : <p>Loading...</p>}</div>;
    
}



export default Profile;