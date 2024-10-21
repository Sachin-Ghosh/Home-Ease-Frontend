import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext'; 
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const router = useRouter();
  const { login } = useAuth();

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
      const response = await fetch(`${process.env.API_URL}api/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('User registered successfully:', data);

      const loginResponse = await fetch(`${process.env.API_URL}api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error('Login failed after registration');
      }

      const loginData = await loginResponse.json();
      login(loginData);

      if (loginData?.role === 'customer') {
        router.push('/personal-info');
      } else if (loginData?.role === 'vendor') {
        router.push('/vendor-info');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen overflow-hidden'>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/assets/login.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="z-10 flex justify-center w-full h-full max-w-sm mx-auto overflow-hidden  rounded-lg  lg:max-w-4xl">
        <div className="w-full px-6 py-2 rounded-xl md:px-8 lg:w-1/2 m-4 border border-white bg-opacity-100 backdrop-blur-sm bg-white">
          <div className="flex justify-center">
            {/* Uncomment if you have a logo */}
            {/* <Image className="w-auto h-7 sm:h-20" src="/assets/Nav-logo.png" alt="Logo" width={100} height={100} /> */}
          </div>

          <p className="text-3xl text-center font-extrabold text-blue-600 mb-4">
            HomeEase
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-gray-600 lg:w-1/4"></span>
            <p className="text-xl text-center font-semibold text-black">
              Get Started
            </p>
            <span className="w-1/5 border-b border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-black bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 shadow-md"
                type="text"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-black bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 shadow-md"
                type="email"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-black" htmlFor="password">Password</label>
                <a href="#" className="text-xs text-black hover:underline">Forget Password?</a>
              </div>

              <input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-black bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 shadow-md"
                type="password"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-black bg-transparent border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 shadow-md"
              >
                <option value="customer">User</option>
                <option value="vendor">Business</option>
              </select>
            </div>

            <div className="mt-6">
              <input
                type='submit'
                value="Sign In"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 shadow-lg hover:shadow-2xl"
              />
            </div>
          </form>

          <div className="flex gap-4 mx-4 my-2 items-center mt-4">
            <h1 className="text-black">Already have an account?</h1>
            <Link href="/login" className="text-md text-blue-600 hover:underline font-semibold">
              Login To Account!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
