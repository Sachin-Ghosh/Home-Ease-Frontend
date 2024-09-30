import React from 'react';
import { FaMapMarkerAlt, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const userData = {
    photo: '/assets/user-photo.jpg',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <img
          src={userData.photo}
          alt="User Profile"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-center">{userData.name}</h2>
        <p className="text-gray-600 text-center">{userData.email}</p>
        <p className="text-gray-600 text-center">{userData.phone}</p>
        <hr className="my-4" />
        <div className="flex flex-col space-y-4">
          <div className="flex items-center cursor-pointer hover:text-blue-600">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <span className="text-lg">Manage Address</span>
          </div>
          <div className="flex items-center cursor-pointer hover:text-blue-600">
            <FaInfoCircle className="text-blue-500 mr-2" />
            <span className="text-lg">About Us</span>
          </div>
          <div className="flex items-center cursor-pointer hover:text-blue-600">
            <FaSignOutAlt className="text-blue-500 mr-2" />
            <span className="text-lg">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
