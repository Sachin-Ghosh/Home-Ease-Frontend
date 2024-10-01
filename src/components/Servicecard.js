import React from 'react';
import ShimmerButton from './ui/shimmer-button';

const cardData = [
  {
    id: 1,
    imgSrc: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    link: "#"
  },
  {
    id: 2,
    imgSrc: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    link: "#"
  },
  {
    id: 3,
    imgSrc: "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    link: "#"
  },
  {
    id: 4,
    imgSrc: "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    link: "#"
  },
];

function Servicecard() {
  return (
    <div className='flex flex-wrap justify-center px-6 py-10 mt-16 gap-10'>
      {cardData.map((card) => (
        <div key={card.id} className='w-80 p-4 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 bg-white'>
          <article className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl">
            <img
              alt="Service"
              src={card.imgSrc}
              className="h-56 w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
            />
            <div className="p-4 text-center">
              <ShimmerButton className="shadow-lg mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold text-lg transition duration-300 hover:opacity-90">
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

export default Servicecard;
