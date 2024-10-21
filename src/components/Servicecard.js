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
    imgSrc: "data:image/jpeg;base64,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",
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
