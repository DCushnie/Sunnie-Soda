import { useState } from "react";
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
      const response = await api.post('/api/users', {
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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={user_password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {success && <p>User created successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SignUp;