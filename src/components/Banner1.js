import React from 'react';

const Banner1 = () => {
  return (
    <div
      className="relative h-96 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative flex flex-col justify-center items-center h-full text-white text-center p-8">
        <h1 className="text-5xl font-extrabold mb-4 shadow-md">Welcome to Our Services!</h1>
        <p className="mb-6 text-lg md:text-xl font-medium">
          Explore the best services available at your doorstep with ease and convenience.
        </p>
        <a href="/services">
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:shadow-xl hover:opacity-90 transform hover:scale-105">
            Explore Services
          </button>
        </a>
      </div>
    </div>
  );
};

export default Banner1;
