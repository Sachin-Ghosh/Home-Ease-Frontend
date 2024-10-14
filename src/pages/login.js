
// import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for redirection

import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { token, login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer' // Default role
  });

  const router = useRouter(); // Initialize useRouter

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.API_URL}api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('No user found, please sign up first');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      login(data);
      // Redirect to the dashboard on successful login
      // router.push('/login');
      // In your login.js file
      if (data?.role === 'customer') {
        router.push('/home'); // Redirect to personal info page
      } else if (data?.role === 'vendor') {
        router.push('/dashboard'); // Redirect to vendor info page (create this page similarly)
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center' style={{ backgroundImage: "url('/assets/Login.png')" }}>
      <div className="flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-70 p-8 rounded-lg shadow-lg">
        <div className="flex justify-center">
          {/* <Image className="w-auto h-20 mb-4" src="/assets/Nav-logo.png" alt="Logo" width={100} height={100} /> */}
        </div>

        <p className="text-3xl text-center font-extrabold text-blue-800 mb-6">
          Home Ease
        </p>

        <p className="text-xl text-center font-semibold text-black mb-4">
          Welcome back!
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="username">Username</label>
            <input id="username" name="username" value={formData.username} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="email">Email Address</label>
            <input id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="password">Password</label>
            <input id="password" name="password" value={formData.password} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="role">Role</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange} className="block w-full px-4 py-2 text-black bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300">
              <option value="customer">User</option>
              <option value="vendor">Business</option>
            </select>
          </div>
          <div className="mt-6">
            <input type='submit' placeholder='Login' value="Login" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" />
          </div>
        </form>
        <div className="flex gap-2 mt-4 items-center">
          <h1 className="text-black">Don{"'"}t have an account?</h1>
          <Link href="/signup" className="text-md text-gray-700 hover:underline font-semibold">Create One!</Link>
        </div>
        {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
      </div>
    </div>
  );
}

export default Login;
