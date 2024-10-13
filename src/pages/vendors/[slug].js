

// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import NearbyVendors from '@/components/NearbyVendors';

// const VendorPage = () => {
//   const router = useRouter();
//   const { slug, subcategoryId, lat, lng, maxDistance } = router.query;
//   const [services, setServices] = useState([]);
//   const [vendorNames, setVendorNames] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchServices = async () => {
//       if (subcategoryId && lat && lng) {
//         setIsLoading(true);
//         setError(null);
//         try {
//           const url = `${process.env.API_URL}api/services/services/filter?subcategory=${subcategoryId}&lng=${lat}&lat=${lng}&maxDistance=${maxDistance || 10000}`;
//           console.log("Fetching URL:", url);

//           const response = await fetch(url);
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();
//           console.log("Received data:", data);
//           setServices(data);

//           // Fetch vendor names
//           const vendorIds = [...new Set(data.map(service => typeof service.vendor === 'object' ? service.vendor._id : service.vendor))];
//           const namesPromises = vendorIds.map(id => fetchVendorName(id));
//           const names = await Promise.all(namesPromises);
//           const vendorNamesMap = Object.fromEntries(vendorIds.map((id, index) => [id, names[index]]));
//           setVendorNames(vendorNamesMap);
//         } catch (error) {
//           console.error('Error fetching services:', error);
//           setError(error.message);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchServices();
//   }, [subcategoryId, lat, lng, maxDistance]);

//   const fetchVendorName = async (vendorId) => {
//     if (!vendorId) return 'Unknown Vendor';
//     try {
//       const response = await fetch(`${process.env.API_URL}api/vendors/${vendorId}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       return data.userId?.name || 'Unknown Vendor';
//     } catch (error) {
//       console.error(`Error fetching vendor name for ID ${vendorId}:`, error);
//       return 'Unknown Vendor';
//     }
//   };

//   const getVendorName = (service) => {
//     const vendorId = typeof service.vendor === 'object' ? service.vendor._id : service.vendor;
//     return vendorNames[vendorId] || 'Loading...';
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="container mx-auto p-4">
//       <NearbyVendors categoryId="66fc8715b5fdfbea12db0e3d"/>
//       <h1 className="text-3xl font-bold mb-6">Services for {slug?.replace(/-/g, ' ')}</h1>
//       {services.length > 0 ? (
//         services.map((service) => (
//           <div key={service._id} className="bg-white shadow-md rounded-lg p-6 mb-4">
//             <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
//             <p className="mb-2">Vendor: {getVendorName(service)}</p>
//             <p className="mb-2">Price: ${service.price}</p>
//             <p className="mb-2">Availability: {service.availability ? 'Available' : 'Not Available'}</p>
//             <p className="mb-2">Description: {service.description}</p>
//             <p className="mb-2">Distance: {service.distance?.toFixed(2)} km</p>
//             <Link href={{
//               pathname: `/servicebooking/${service._id}`,
//               query: {
//                 serviceName: service.name,
//                 vendorName: getVendorName(service),
//                 price: service.price,
//                 description: service.description,
//                 subcategoryName: slug?.replace(/-/g, ' ')
//               }
//             }}>
//               <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                 Book Appointment
//               </button>
//             </Link>
//           </div>
//         ))
//       ) : (
//         <p>No services found for this subcategory within the specified distance. (Subcategory: {subcategoryId}, Lng: {lat}, Lat: {lng})</p>
//       )}
//     </div>
//   );
// };

// export default VendorPage;

// new working code

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import NearbyVendors from '@/components/NearbyVendors';

const VendorPage = () => {
  const router = useRouter();
  const { slug, subcategoryId, lat, lng, maxDistance } = router.query;
  const [services, setServices] = useState([]);
  const [vendorNames, setVendorNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      if (subcategoryId && lat && lng) {
        setIsLoading(true);
        setError(null);
        try {
          const url = `${process.env.API_URL}api/services/services/filter?subcategory=${subcategoryId}&lng=${lat}&lat=${lng}&maxDistance=${maxDistance || 10000}`;
          console.log("Fetching URL:", url);

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Received data:", data);
          setServices(data);

          // Fetch vendor names
          const vendorIds = [...new Set(data.map(service => typeof service.vendor === 'object' ? service.vendor._id : service.vendor))];
          const namesPromises = vendorIds.map(id => fetchVendorName(id));
          const names = await Promise.all(namesPromises);
          const vendorNamesMap = Object.fromEntries(vendorIds.map((id, index) => [id, names[index]]));
          setVendorNames(vendorNamesMap);
        } catch (error) {
          console.error('Error fetching services:', error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchServices();
  }, [subcategoryId, lat, lng, maxDistance]);

  const fetchVendorName = async (vendorId) => {
    if (!vendorId) return 'Unknown Vendor';
    try {
      const response = await fetch(`${process.env.API_URL}api/vendors/${vendorId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.userId?.name || 'Unknown Vendor';
    } catch (error) {
      console.error(`Error fetching vendor name for ID ${vendorId}:`, error);
      return 'Unknown Vendor';
    }
  };

  const getVendorName = (service) => {
    const vendorId = typeof service.vendor === 'object' ? service.vendor._id : service.vendor;
    return vendorNames[vendorId] || 'Loading...';
  };

  const getVendorId = (service) => {
    return typeof service.vendor === 'object' ? service.vendor._id : service.vendor;
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <NearbyVendors vendorNames={vendorNames} services={services}/>
      <h1 className="text-3xl font-bold mb-6">Services for {slug?.replace(/-/g, ' ')}</h1>
      {services.length > 0 ? (
        services.map((service) => (
          <div key={service._id} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="mb-2">Vendor: {getVendorName(service)}</p>
            <p className="mb-2">Price: ₹{service.price}</p>
            <p className="mb-2">Availability: Available</p>
            <p className="mb-2">Description: {service.description}</p>
            {/* <p className="mb-2">Distance: {service.distance?.toFixed(2)} km</p> */}
            <Link href={{
              pathname: `/servicebooking/${service._id}`,
              query: {
                serviceName: service.name,
                vendorName: getVendorName(service),
                vendorId: getVendorId(service), // Add this line to pass the vendor ID
                price: service.price,
                description: service.description,
                subcategoryName: slug?.replace(/-/g, ' ')
              }
            }}>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Book Appointment
              </button>
            </Link>
          </div>
        ))
      ) : (
        <p>No services found for this subcategory within the specified distance. (Subcategory: {subcategoryId}, Lng: {lat}, Lat: {lng})</p>
      )}
    </div>
  );
};

export default VendorPage;