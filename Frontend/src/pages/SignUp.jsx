import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import axios from "axios";
import api from '../pages/Api.js'; // Import the API instance

function SignUp() {
  const [firstname, setFirstname] = useState(''); // these states will hold the values of the input fields
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => { 

    //this prevent the default form submission and sends a post request to the backend
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Make a POST request to the /api/users endpoint
      const response = await api.post('/users', {
        firstname,
        lastname,
        email,
        user_password,
      });

      // If successful, set success state
      setSuccess(true);
      console.log('User created:', response.data);
      alert('User created successfully!');
    } catch (err) {
      // Handle errors and set error state
      setError(err.response?.data?.error || 'An error occurred');
      console.error(err);
    }
  }; //end of handleSignUp

  return (
    <div className="bg-blue-200">

      <div class="flex min-h-fit flex-col justify-center lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm sm:mt-6">
          <img src="/Images/Sunnie_main_lgogo-removebg-preview.png" alt="Sunnie" class="mx-auto h-22 w-fit shrink-0" />
        </div>
      </div>


      <form onSubmit={handleSignUp}>
        <div className="min-h-screen flex flex-col items-center px-4">
          <h1 class="text-3xl font-semibold text-green-950 mt-5 mb-6">Trust your gut & Sign UP! </h1>
          <div class="w-full md:max-w-md bg-white rounded-xl shadow-md p-8 sm:mx-w-screen">
            <div className="mb-6">
              <label class="block text-sm font-medium mb-2">
                First Name
              </label>
                <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 transition"
                />
            </div>
            
            
            
           <div className="mb-4">
              <label htmlFor="" className="block text-sm font-medium mb-2">Lastname</label>
              <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:border-2 focus:ring-indigo-500 focus:border-indigo-500 transition"

              />
           </div>
           <div className="mb-4">
              <label htmlFor="" className="block text-sm font-medium mb-2">Email</label>
              <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:border-2 focus:ring-indigo-500 focus:border-indigo-500 transition"

              />
           </div>
           <div className="mb-4">
              <label htmlFor="" className="block text-sm font-medium mb-2">Password</label>
              <input
              type="password"
              placeholder="Password"
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:border-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              
            />

            <button className="size-4"/>
            
           </div>

           <div className="flex items-center justify-between mb-6">
            <label htmlFor="" className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300"
              />
              Remeber me?
            </label>

            <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Forgot password?
            </a>
           </div>
            
            
            
            <button type="submit" className="w-full py-2.5 rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg font-bold hover:outline-2 hover:outline-blue-300 hover:opacity-80 transition mb-4 cursor-pointer">
              Sign Up
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
        
      </form>
      {success && <p>User created successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SignUp;