import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { token, login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

      if (data?.role === 'customer') {
        router.push('/home');
      } else if (data?.role === 'vendor') {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/assets/login.mp4"
        autoPlay
        loop
        muted
      />
      {/* Semi-transparent overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md">
        <div className="flex justify-center mb-4">
          {/* Add a logo if needed */}
        </div>

        <p className="text-4xl text-center font-extrabold text-blue-800 mb-6">
          Home Ease
        </p>

        <p className="text-xl text-center font-semibold text-black mb-4">
          Welcome back!
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
              type="text"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
              type="email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
              type="password"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-black" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="block w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
            >
              <option value="customer">User</option>
              <option value="vendor">Business</option>
            </select>
          </div>

          <div className="mt-6">
            <input
              type="submit"
              placeholder="Login"
              value="Login"
              className="w-full px-6 py-3 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            />
          </div>
        </form>

        <div className="flex gap-2 mt-4 items-center">
          <h1 className="text-black">Don't have an account?</h1>
          <Link href="/signup" className="text-md text-blue-700 hover:underline font-semibold">
            Create One!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
