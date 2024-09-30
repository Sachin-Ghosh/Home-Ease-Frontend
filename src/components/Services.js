// const servicesData = [
//     { name: "Women's Salon & Haircut", image: "/assets/womens-salon.jpg" },
//     { name: "Men's Salon & Haircut", image: "/assets/mens-salon.jpg" },
//     { name: "AC Repair", image: "/assets/ac-repair.jpg" },
//     { name: "Cleaning & Pest Control", image: "/assets/cleaning.jpg" },
//     { name: "Plumbing & Electrician", image: "/assets/plumbing.jpg" },
//     { name: "Water Purifier", image: "/assets/water-purifier.jpg" },
//     { name: "Painting", image: "/assets/painting.jpg" },
//     { name: "Smart Lock", image: "/assets/smart-lock.jpg" },
//     { name: "Wall Panel", image: "/assets/wall-panel.jpg" }
//   ];
  
//   const Services = () => {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {servicesData.map((service, index) => (
//           <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
//             <img
//               src={service.image}
//               alt={service.name}
//               className="w-full h-32 object-cover rounded-t-lg"
//             />
//             <p className="mt-2 font-semibold">{service.name}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default Services;
  
import React, { useState } from 'react';
import Modal from './Modal';

const servicesData = [
  { name: "Women's Salon & Haircut", image: "/assets/womens-salon.jpg" },
  { name: "Men's Salon & Haircut", image: "/assets/mens-salon.jpg" },
  { name: "AC Repair", image: "/assets/ac-repair.jpg" },
  { name: "Cleaning & Pest Control", image: "/assets/cleaning.jpg" },
  { name: "Plumbing & Electrician", image: "/assets/plumbing.jpg" },
  { name: "Painting", image: "/assets/painting.jpg" },
  { name: "Smart Lock", image: "/assets/smart-lock.jpg" },
  { name: "Wall Panel", image: "/assets/wall-panel.jpg" },
  { name: "Water Purifier", image: "/assets/water-purifier.jpg" }
];

const additionalServicesMap = {
  "Women's Salon & Haircut": [
    { name: "Spa for Women", image: "/assets/spa-womens.jpg" },
    { name: "Haircut for Women", image: "/assets/womens-salon.jpg" },
    { name: "Beauty Parlour for Women", image: "/assets/beauty-parlour.jpg" }
  ],
  "Men's Salon & Haircut": [
    { name: "Men's Haircut", image: "/assets/mens-salon.jpg" },
    { name: "Men's Spa", image: "/assets/spa-mens.jpg" },
    { name: "Men's Massage", image: "/assets/massage-men.jpg" }
  ],
  "AC Repair": [
    { name: "Refrigerator Repair", image: "/assets/refrigerator-repair.jpg" },
    { name: "Laptop Repair", image: "/assets/laptop-repair.jpg" },
    { name: "AC Repair", image: "/assets/ac-repair.jpg" },
    { name: "Chimney Repair", image: "/assets/chimney-repair.jpg" }
  ],
  "Cleaning & Pest Control": [
    { name: "Full Home Cleaning", image: "/assets/cleaning.jpg" },
    { name: "Kitchen Cleaning", image: "/assets/kitchen-cleaning.jpg" },
    { name: "Sofa Cleaning", image: "/assets/sofa-cleaning.jpg" }
  ],
  "Plumbing & Electrician": [
    { name: "Electrician", image: "/assets/electrician.jpg" },
    { name: "Plumber", image: "/assets/plumbing.jpg" },
    { name: "Carpenter", image: "/assets/carpenter.jpg" }
  ],
  "Painting": [
    { name: "Full Home Painting", image: "/assets/full-home-painting.jpg" },
    { name: "Room Painting", image: "/assets/room-painting.jpg" }
  ]
};

const Services = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentServiceDetails, setCurrentServiceDetails] = useState([]);

  const handleServiceClick = (serviceName) => {
    setCurrentServiceDetails(additionalServicesMap[serviceName] || []);
    setModalOpen(true);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        serviceDetails={currentServiceDetails}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
            onClick={() => handleServiceClick(service.name)} // Open modal on click
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <p className="mt-2 font-semibold">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
