

// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import React from 'react';

// const VendorPage = () => {
//   const router = useRouter();
//   const { slug } = router.query; // Extract the slug from the URL
//   const { image } = router.query; // Extract the image query parameter

//   return (
//     <div className="h-screen">
//       {/* Banner Section */}
//       <div className="bg-red-950 h-60 flex justify-center items-center">
//         {image ? (
//           <img
//             src={image}
//             alt={slug}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <p className="text-white text-2xl">No Image Available</p>
//         )}
//       </div>

//       {/* Content Section */}
//       <div className="mt-6 mb-5">
//         <a className="text-4xl font-sans subpixel-antialiased font-bold ml-10">
//           Available vendors for {slug?.replace(/-/g, ' ')}
//         </a>
//       </div>

//       <div className="border-t-2 border-black mb-8" />
//       <div className="flex flex-col items-center">
//         <div className="flex flex-row h-64 w-11/12 bg-slate-950 justify-between">
//           <div className="h-56 w-56 bg-slate-600">hey</div>
//           <div className="h-56 w-56 bg-slate-600">hey</div>
//           <div className="h-56 w-56 bg-slate-600">hey</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorPage;

import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const VendorPage = () => {
  const router = useRouter();
  const { slug } = router.query; // Extract the slug from the URL
  const { image } = router.query; // Extract the image query parameter
  const [vendors, setVendors] = useState([]);
  
  useEffect(() => {
    const fetchVendors = async () => {
      if (slug) {
        const response = await fetch(`http://localhost:5000/api/vendors?service=${slug.replace(/-/g, ' ')}`);
        const data = await response.json();
        setVendors(data);
      }
    };

    fetchVendors();
  }, [slug]);

  return (
    <div className="h-screen">
      {/* Banner Section */}
      <div className="bg-red-950 h-60 flex justify-center items-center">
        {image ? (
          <img
            src={image}
            alt={slug}
            className="h-full w-full object-cover"
          />
        ) : (
          <p className="text-white text-2xl">No Image Available</p>
        )}
      </div>

      {/* Content Section */}
      <div className="mt-6 mb-5">
        <a className="text-4xl font-sans subpixel-antialiased font-bold ml-10">
          Available vendors for {slug?.replace(/-/g, ' ')}
        </a>
      </div>

      <div className="border-t-2 border-black mb-8" />
      <div className="flex flex-col items-center">
        {vendors.length > 0 ? (
          vendors.map(vendor => (
            <div key={vendor._id} className="bg-slate-200 w-11/12 p-4 mb-4 rounded-lg shadow">
              <h2 className="text-xl font-bold">{vendor.name}</h2>
              <p>Location: {vendor.location.coordinates.join(', ')}</p>
              <p>Availability: {vendor.availability ? 'Available' : 'Not Available'}</p>
              <p>Rating: {vendor.rating} ({vendor.totalReviews} reviews)</p>
              <p>Bio: {vendor.bio}</p>
            </div>
          ))
        ) : (
          <p>No vendors found for this service.</p>
        )}
      </div>
    </div>
  );
};

export default VendorPage;
