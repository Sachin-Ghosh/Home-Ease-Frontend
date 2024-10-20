import React from 'react';

const Banner1 = () => {
  return (
    <div className="relative h-96">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="/assets/banner.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center h-full text-white text-center p-8">
        <h1 className="text-5xl font-extrabold mb-4 shadow-md">
          Welcome to Our Services!
        </h1>
        <p className="mb-6 text-lg md:text-xl font-medium">
          Explore the best services available at your doorstep with ease and
          convenience.
        </p>
        <a href="/services">
          <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:shadow-xl hover:opacity-90 transform hover:scale-105">
            Explore Services
          </button>
        </a>
      </div>
    </div>
  );
};

export default Banner1;
