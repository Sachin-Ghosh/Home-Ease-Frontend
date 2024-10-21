import React from 'react';
import ShimmerButton from './ui/shimmer-button';

const bestSellerData = [
  {
    id: 1,
    name: "Spa for Women",
    imgSrc: "https://images.unsplash.com/photo-1582719478189-df3ad2992830?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8c3BhJTIwZm9yJTIwd29tZW58ZW58MHx8fHwxNjg1Nzg5MTE2&auto=format&fit=crop&w=800&q=80",
    price: "₹50",
    link: "#"
  },
  {
    id: 2,
    name: "Men's Haircut",
    imgSrc: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixid=MnwzNjUyOXwwfDF8c2VhcmNofTI3fG1lbidzJ3NoYWlyY3V0fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    price: "₹30",
    link: "#"
  },
  {
    id: 3,
    name: "AC Repair",
    imgSrc: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofTg2fG5haXJlJTIwYXMlMjB1c3VhbHxlbnwwfHx8fDE2ODU3OTkzNzI&ixlib=rb-1.2.1&q=80&w=800",
    price: "₹100",
    link: "#"
  },
  {
    id: 4,
    name: "Full Home Cleaning",
    imgSrc: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofTg3fGZ1bGwlMjBodG9tZSUyMGNsaWFuaW5nfGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=800",
    price: "₹150",
    link: "#"
  }
];

function BestSellerServices() {
  return (
    <div className="flex flex-wrap justify-center px-6 py-10 mt-16 gap-10">
      {bestSellerData.map((service) => (
        <div
          key={service.id}
          className="w-80 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 bg-white"
        >
          <article className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-transform duration-500 ease-in-out">
            <img
              alt={service.name}
              src={service.imgSrc}
              className="h-56 w-full object-cover rounded-t-lg transition-transform duration-500 ease-in-out hover:scale-110"
            />
            <div className="p-5 text-center">
              <h3 className="font-bold text-xl mb-2 text-gray-800">{service.name}</h3>
              <p className="text-gray-600 mb-4 text-lg">{service.price}</p>
              <ShimmerButton className="shadow-lg w-full py-3 bg-white border-2 border-blue-600 rounded-full text-blue-600 font-semibold text-lg transition duration-300 hover:bg-blue-600 hover:text-white">
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
