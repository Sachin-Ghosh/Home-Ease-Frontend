import React from 'react';
import ShimmerButton from './ui/shimmer-button';

const bestSellerData = [
  {
    id: 1,
    name: "Spa for Women",
    imgSrc: "https://images.unsplash.com/photo-1582719478189-df3ad2992830?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$50",
    link: "#"
  },
  {
    id: 2,
    name: "Men's Haircut",
    imgSrc: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$30",
    link: "#"
  },
  {
    id: 3,
    name: "AC Repair",
    imgSrc: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$100",
    link: "#"
  },
  {
    id: 4,
    name: "Full Home Cleaning",
    imgSrc: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$150",
    link: "#"
  }
];

function BestSellerServices() {
  return (
    <div className='flex flex-wrap justify-center px-6 py-10 mt-16 gap-10'>
      {bestSellerData.map((service) => (
        <div key={service.id} className='w-80 p-4 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 bg-white'>
          <article className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl">
            <img
              alt={service.name}
              src={service.imgSrc}
              className="h-56 w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.price}</p>
              <ShimmerButton className="shadow-lg w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold text-lg transition duration-300 hover:opacity-90">
                <span className="whitespace-pre-wrap text-sm font-medium tracking-tight">
                  Buy Now
                </span>
              </ShimmerButton>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}

export default BestSellerServices;
