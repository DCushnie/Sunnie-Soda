import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Navbar from '../components/Navbar.jsx';
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
    <div class="bg-blue-100">
      

      <div class="flex min-h-fit flex-col justify-center lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm sm:mt-6">
          <img src="/Images/Sunnie_main_lgogo-removebg-preview.png" alt="Sunnie" class="mx-auto h-22 w-fit shrink-0" />
        </div>
      </div>
      
      
      <form onSubmit={handleLogin}>
        <div className="min-h-screen flex flex-col items-center px-4">
          <h1 class="text-3xl font-semibold text-green-950 mt-5 mb-6">Sip Back and Relax</h1>
          <div className="w-full md:max-w-md bg-white rounded-xl shadow-md p-8 sm:mx-w-screen">
              <div className="mb-6">
                <label htmlFor="" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 transition"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="" className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 transition"

                />
              </div>
              
              
              <button type="submit" className="w-full py-2.5 rounded-md bg-gradient-to-r from-blue-400 to-purple-500 text-white text-lg font-bold hover:outline-2 hover:outline-blue-300 hover:opacity-80 transition mb-4 cursor-pointer">
                Login
              </button>

              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span class="mx-4 text-sm -text-gray-300 font-semibold">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
                  <FcGoogle size={20} />
                  Google
                </button>
  
                <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
                  <FaGithub size={18} />
                  GitHub
                </button>
              </div>
          </div>
        </div>
        
        
        
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </form>
    </div>
  );
}

export default Login;