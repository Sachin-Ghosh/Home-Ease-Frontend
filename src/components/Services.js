
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import Modal from './Modal';

// // const BASE_URL = 'https://home-ease-m1t9.onrender.com';

// const Services = () => {
//   const router = useRouter();
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [currentServiceDetails, setCurrentServiceDetails] = useState([]);
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await fetch(`${process.env.API_URL}api/services/services/categorys`);
//       const data = await response.json();
//       setServices(data);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     }
//   };

//   const handleServiceClick = (service) => {
//     setCurrentServiceDetails(service.subCategories || []);
//     setModalOpen(true);
//   };

//   const handleSubServiceClick = (subService) => {
//     const serviceSlug = subService.name.replace(/\s+/g, '-').toLowerCase();
//     router.push({
//       pathname: `/vendors/${serviceSlug}`,
//       query: { image: subService.image }
//     });
//   };

//   return (
//     <div>
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         serviceDetails={currentServiceDetails}
//         onSubServiceClick={handleSubServiceClick}
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {services.map((service) => (
//           <div
//             key={service._id}
//             className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
//             onClick={() => handleServiceClick(service)}
//           >
//             <img
//               src={`${process.env.API_URL}${service.image}`}
//               alt={service.name}
//               className="w-full h-32 object-cover rounded-t-lg"
//             />
//             <p className="mt-2 font-semibold">{service.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Services;

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Modal from './Modal';

const Services = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentServiceDetails, setCurrentServiceDetails] = useState([]);
  const [services, setServices] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchServices();
    getUserLocation();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/services/services/categorys`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleServiceClick = (service) => {
    setCurrentServiceDetails(service.subCategories || []);
    setModalOpen(true);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        serviceDetails={currentServiceDetails}
        userLocation={userLocation}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
            onClick={() => handleServiceClick(service)}
          >
            <img
              src={`${process.env.API_URL}${service.image}`}
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