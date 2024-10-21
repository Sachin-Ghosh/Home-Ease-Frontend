

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

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, DollarSign, Clock, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import NearbyVendors from '@/components/NearbyVendors'
import { useRouter } from 'next/router'

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

  if (isLoading) {
    return (
      <div className="w-screen mx-auto p-4">
        <Skeleton className="w-[250px] h-[20px] mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-[150px] mb-2" />
                <Skeleton className="h-4 w-[100px] mb-2" />
                <Skeleton className="h-4 w-[200px]" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-[150px]" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-screen h-full mx-auto p-4 bg-white">
      <NearbyVendors vendorNames={vendorNames} services={services}/>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Services for {router.query.slug?.replace(/-/g, ' ')}
      </h1>
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service._id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-600">{service.name}</CardTitle>
                <CardDescription>{getVendorName(service)}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-blue-500" />
                    <span>₹{service.price}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center">
                    <Info className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="line-clamp-2">{service.description}</span>
                  </div>
                  {service.distance && (
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                      <span>{service.distance.toFixed(2)} km</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50">
                <Link href={{
                  pathname: `/servicebooking/${service._id}`,
                  query: {
                    serviceName: service.name,
                    vendorName: getVendorName(service),
                    vendorId: getVendorId(service),
                    price: service.price,
                    description: service.description,
                    subcategoryName: router.query.slug?.replace(/-/g, ' ')
                  }
                }} className="w-full">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Book Appointment
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-600">No Services Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No services found for this subcategory within the specified distance.</p>
            <p className="mt-2">
              <Badge variant="outline" className="mr-2">Subcategory: {router.query.subcategoryId}</Badge>
              <Badge variant="outline" className="mr-2">Longitude: {router.query.lat}</Badge>
              <Badge variant="outline">Latitude: {router.query.lng}</Badge>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default VendorPage;