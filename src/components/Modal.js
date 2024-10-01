import Link from 'next/link';
import React from 'react';

const Modal = ({ isOpen, onClose, serviceDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          &times; 
        </button>
        <h2 className="text-lg font-bold mb-4">What are you looking for?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {serviceDetails.map((detail, index) => (
          
            <div key={index} className="bg-gray-100 p-2 rounded-lg text-center">
                <Link href='/vendorPage'>
              <img
                src={detail.image}
                alt={detail.name}
                className="w-full h-20 object-cover rounded-t-lg"
              />
              <p className="mt-2">{detail.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
