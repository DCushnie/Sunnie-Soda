import { useState } from 'react';
import axios from 'axios';
import api from '../pages/Api.js'; // Import the API instance


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        // Prevent the default form submission and send a POST request to the backend
        e.preventDefault();
        setError(null); // Reset error state
        try {
            
            const response = await api.post('/auth/login', {email, password});


            if(response.status == 401) {
                alert("Invalid email or password");
            }

            console.log('Login successful!');
            window.location.href = '/showproducts'; // Redirect to the home page or dashboard
        } catch (err) {
            if(err.status == 401) {
                alert("Invalid email or password");
            }

            setError(err.response?.data?.error || 'An error occurred');
            console.error(err, err.status);
        }
    }


  return (
    <div>
      <h1>Login Page</h1>
      <p>Please enter your credentials to log in.</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </form>
    </div>
  );
}

export default Login;