

// import React from 'react';
// import { useRouter } from 'next/router';

// const Modal = ({ isOpen, onClose, serviceDetails }) => {
//   const router = useRouter();

//   if (!isOpen) return null;

//   const handleSubCategoryClick = (subCategory) => {
//     router.push({
//       pathname: '/vendors/[slug]',
//       query: { 
//         slug: subCategory.name.toLowerCase().replace(/\s+/g, '-'),
//         subcategoryId: subCategory._id
//       }
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
//           &times; 
//         </button>
//         <h2 className="text-lg font-bold mb-4">What are you looking for?</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {serviceDetails.map((detail) => (
//             <div 
//               key={detail._id} 
//               className="bg-gray-100 p-2 rounded-lg text-center cursor-pointer"
//               onClick={() => handleSubCategoryClick(detail)}
//             >
//               <img
//                 src={`${process.env.API_URL}${detail.image}`}
//                 alt={detail.name}
//                 className="w-full h-20 object-cover rounded-t-lg"
//               />
//               <p className="mt-2">{detail.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
import React from 'react';
import { useRouter } from 'next/router';

const Modal = ({ isOpen, onClose, serviceDetails, userLocation }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubCategoryClick = (subCategory) => {
    router.push({
      pathname: '/vendors/[slug]',
      query: { 
        slug: subCategory.name.toLowerCase().replace(/\s+/g, '-'),
        subcategoryId: subCategory._id,
        lat: userLocation?.lat,
        lng: userLocation?.lng,
        maxDistance: 10000 // 10km in meters
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          &times; 
        </button>
        <h2 className="text-lg font-bold mb-4">What are you looking for?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {serviceDetails.map((detail) => (
            <div 
              key={detail._id} 
              className="bg-gray-100 p-2 rounded-lg text-center cursor-pointer"
              onClick={() => handleSubCategoryClick(detail)}
            >
              <img
                src={`${process.env.API_URL}${detail.image}`}
                alt={detail.name}
                className="w-full h-20 object-cover rounded-t-lg"
              />
              <p className="mt-2">{detail.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;