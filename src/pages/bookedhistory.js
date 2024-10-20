// 'use client'

// import { useEffect, useState } from 'react'
// import { MapPin, MessageCircle, Clock, CreditCard } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'

// // Placeholder data for booked services
// const bookedServices = [
//   { id: 1, name: 'Home Cleaning', date: '2023-05-15', time: '14:00', status: 'ongoing', type: 'normal', vendor: 'CleanPro' },
//   { id: 2, name: 'Plumbing Repair', date: '2023-05-16', time: '10:00', status: 'ongoing', type: 'special', vendor: 'FixIt Plumbing' },
//   { id: 3, name: 'Pest Control', date: '2023-05-10', time: '09:00', status: 'completed', type: 'normal', vendor: 'BugBusters' },
//   { id: 4, name: 'AC Servicing', date: '2023-05-12', time: '11:00', status: 'completed', type: 'special', vendor: 'CoolAir Services' },
// ]

// export default function BookedServices() {
//   const [selectedTab, setSelectedTab] = useState('all'); // State for selected tab
//   const [selectedService, setSelectedService] = useState(null); // State for selected service

//   useEffect(() => {
//     if (typeof document !== 'undefined') {
//       // Define the keyframes for the shine animation
//       const styleSheet = document.styleSheets[0];
//       styleSheet.insertRule(`
//         @keyframes shine {
//           0% { box-shadow: 0 0 5px red; }
//           50% { box-shadow: 0 0 20px red; }
//           100% { box-shadow: 0 0 5px red; }
//         }
//       `, styleSheet.cssRules.length);
//     }
//   }, []);

//   const handleTabChange = (value) => {
//     setSelectedTab(value);
//   };

//   const ServiceCard = ({ service }) => (
//     <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
//       <CardHeader>
//         <CardTitle className="flex justify-between items-center">
//           {service.name}
//           <Badge
//             style={{
//               backgroundColor: service.type === 'special' ? 'red' : 'gray',
//               color: 'white',
//               padding: '0.5em',
//               borderRadius: '0.25em',
//               animation: service.type === 'special' ? 'shine 1.5s infinite' : 'none',
//               boxShadow: service.type === 'special' ? '0 0 5px red' : 'none',
//             }}
//           >
//             {service.type} booking
//           </Badge>
//         </CardTitle>
//         <CardDescription className="text-gray-600">{service.date} at {service.time}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <p className="text-gray-700">Vendor: {service.vendor}</p>
//       </CardContent>
//       <CardFooter className="flex justify-between items-center">
//         <Badge variant={
//           service.status === 'completed' ? 'secondary' :
//           service.status === 'ongoing' ? 'default' : 'outline'
//         }>
//           {service.status}
//         </Badge>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button
//               variant="outline"
//               onClick={() => setSelectedService(service)}
//               style={{
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 borderRadius: '0.25em',
//                 transition: 'transform 0.3s ease, background-color 0.3s ease',
//                 transform: 'scale(1)',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'scale(1.05)';
//                 e.currentTarget.style.backgroundColor = '#0056b3';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.backgroundColor = '#007bff';
//               }}
//             >
//               View Details
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px] bg-white">
//             {selectedService && (selectedService.status !== 'completed' ? <OngoingServiceModal service={selectedService} /> : <CompletedServiceModal service={selectedService} />)}
//           </DialogContent>
//         </Dialog>
//       </CardFooter>
//     </Card>
//   )

//   const OngoingServiceModal = ({ service }) => (
//     <>
//       <DialogHeader className='bg-white'>
//         <DialogTitle>{service.name} - Ongoing</DialogTitle>
//         <DialogDescription>Service details and live updates</DialogDescription>
//       </DialogHeader>
//       <div className="grid gap-4 py-4">
//         <div className="h-[200px] bg-muted rounded-md flex items-center justify-center">
//           Map Placeholder
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex items-center">
//             <Clock className="mr-2" size={20} />
//             <span>Scheduled: {service.time}</span>
//           </div>
//           <div className="flex items-center">
//             <MapPin className="mr-2" size={20} />
//             <span>En route</span>
//           </div>
//           <div className="flex items-center">
//             <CreditCard className="mr-2" size={20} />
//             <span>Payment: Completed</span>
//           </div>
//         </div>
//         <div>
//           <h4 className="font-semibold mb-2">Service Info</h4>
//           <p>Vendor: {service.vendor}</p>
//           <p>Type: {service.type} booking</p>
//         </div>
//         <Button className="w-full">
//           <MessageCircle className="mr-2" size={20} />
//           Chat with {service.vendor}
//         </Button>
//       </div>
//     </>
//   )

//   const CompletedServiceModal = ({ service }) => (
//     <>
//       <DialogHeader className='bg-white'>
//         <DialogTitle className='bg-white'>{service.name} - Completed</DialogTitle>
//         <DialogDescription>Service summary</DialogDescription>
//       </DialogHeader>
//       <div className="grid gap-4 py-4 bg-white">
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex items-center">
//             <Clock className="mr-2" size={20} />
//             <span>Completed: {service.time}</span>
//           </div>
//           <div className="flex items-center">
//             <CreditCard className="mr-2" size={20} />
//             <span>Payment: Completed</span>
//           </div>
//         </div>
//         <div>
//           <h4 className="font-semibold mb-2">Service Info</h4>
//           <p>Vendor: {service.vendor}</p>
//           <p>Type: {service.type} booking</p>
//         </div>
//         <Button className="w-full">
//           <MessageCircle className="mr-2" size={20} />
//           Chat with {service.vendor}
//         </Button>
//       </div>
//     </>
//   )

//   const TabsTrigger = ({ value, children }) => (
//     <button
//       onClick={() => handleTabChange(value)}
//       className={`px-4 py-2 ${
//         selectedTab === value ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'
//       }`}
//     >
//       {children}
//     </button>
//   );

//   return (
//     <div className="mx-auto px-4 py-8 bg-white min-h-screen">
//       <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">My Booked Services</h1>
//       <div className="w-full">
//         <div className="flex justify-center mb-6">
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
//           <TabsTrigger value="completed">Completed</TabsTrigger>
//         </div>
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {selectedTab === 'all' && bookedServices.map((service) => (
//             <ServiceCard key={service.id} service={service} />
//           ))}
//           {selectedTab === 'ongoing' && bookedServices.filter((s) => s.status !== 'completed').map((service) => (
//             <ServiceCard key={service.id} service={service} />
//           ))}
//           {selectedTab === 'completed' && bookedServices.filter((s) => s.status === 'completed').map((service) => (
//             <ServiceCard key={service.id} service={service} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { MapPin, MessageCircle, Clock, CreditCard } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { useAuth } from '@/context/AuthContext';

// export default function BookedServices() {
  
//   const router = useRouter();
//   const { token, authUser } = useAuth();
//   const [bookedServices, setBookedServices] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('all');
//   const [selectedService, setSelectedService] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [customerName, setCustomerName] = useState('');
//   const [customerId, setCustomerId] = useState('');
//   const [vendorName, setVendorName] = useState('');
//   const [vendorId, setVendorId] = useState('');
//   const [vendorUserId, setVendorUserId] = useState('');

//   useEffect(() => {
//   const fetchCustomerInfo = async () => {
//     if (!authUser) return;
//     try {
//       const response = await fetch(`${process.env.API_URL}api/customers/customer/user/${authUser._id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       if (!response.ok) throw new Error('Failed to fetch profile');
//       const data = await response.json();
//       console.log("Customer info API response:", data);
//       if (data) {
//         setCustomerName(data.userId.name);
//         setCustomerId(data._id);
//         console.log("Set customer name:", data.name);
//         console.log("Set customer ID:", data._id);
//       } else {
//         console.error('Failed to fetch customer info:', 'No customer data in response');
//       }
//     } catch (error) {
//       console.error('Error fetching customer info:', error);
//     }
//   }; fetchCustomerInfo();
// }, [ authUser]);

// useEffect(() => {
//   if (customerId) {
//     fetchBookings();
//   }
// }, [customerId]);

// useEffect(() => {
//   if (vendorUserId) {
//     fetchVendorInfo();
//   }
// }, [vendorUserId]);

// const fetchBookings = async () => {
//   try {
//     const response = await fetch(`${process.env.API_URL}api/bookings/customer/${customerId}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch bookings');
//     }

//     const data = await response.json();
//     console.log("Fetched bookings data:", data); // Log the full response for debugging

//     if (data.length > 0 && data[0].vendor) {
//       console.log("Vendor data:", data[0].vendor);

//       // Check if vendor exists and has userId
//       if (data[0].vendor.userId) {
//         const vendorUserId = data[0].vendor.userId;
//         console.log("Vendor User ID:", vendorUserId);
//         setVendorUserId(vendorUserId);
//       } else {
//         console.error("Vendor data does not have a userId");
//       }
//     } else {
//       console.error("No vendor data found in the first booking");
//     }

//     setBookedServices(data);
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//   }
// };



//     const fetchVendorInfo = async () => {
//       try {
//         const response = await fetch(`${process.env.API_URL}api/vendors/vendor/user/${vendorUserId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (!response.ok) throw new Error('Failed to fetch profile');
//         const data = await response.json();
//         setVendorName(data.userId.name);
//         setVendorId(data._id);
//       } catch (error) {
//         console.error('Error fetching vendor info:', error);
//       }
//     };
  

//   const handleTabChange = (value) => {
//     setSelectedTab(value);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const ServiceCard = ({ service }) => (
//     <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
//       <CardHeader>
//         <CardTitle className="flex justify-between items-center">
//           {service.service[0].name}
//         </CardTitle>
//         <CardDescription className="text-gray-600">
//           Start: {formatDate(service.slot.startTime)}
//           <br />
//           End: {formatDate(service.slot.endTime)}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <p className="text-gray-700">Vendor: {vendorName || 'N/A'}</p>
//         <p className="text-gray-700">Payment Type: {service.payment_type}</p>
//         <p className="text-gray-700">Payment Status: {service.payment_status}</p>
//       </CardContent>
//       <CardFooter className="flex justify-between items-center">
//         <Badge variant={service.status === 'completed' ? 'secondary' : 'default'}>
//           {service.status}
//         </Badge>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button variant="outline">View Details</Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px] bg-white">
//             <ServiceDetailsModal service={service} />
//           </DialogContent>
//         </Dialog>
//       </CardFooter>
//     </Card>
//   );

//   const ServiceDetailsModal = ({ service }) => (
//     <>
//       <DialogHeader className='bg-white'>
//         <DialogTitle>{service.service[0].name}</DialogTitle>
//         <DialogDescription>Service details</DialogDescription>
//       </DialogHeader>
//       <div className="grid gap-4 py-4 bg-white">
//         <div>
//           <h4 className="font-semibold mb-2">Booking Info</h4>
//           <p>Start Time: {formatDate(service.slot.startTime)}</p>
//           <p>End Time: {formatDate(service.slot.endTime)}</p>
//           <p>Vendor: {service.vendor.userId.name || 'N/A'}</p>
//           <p>Payment Type: {service.payment_type}</p>
//           <p>Payment Status: {service.payment_status}</p>
//           <p>Booking Status: {service.status}</p>
//         </div>
//         <Button className="w-full">
//           <MessageCircle className="mr-2" size={20} />
//           Chat with Vendor
//         </Button>
//       </div>
//     </>
//   );

//   return (
//     <div className="mx-auto px-4 py-8 bg-white min-h-screen">
//       <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">My Booked Services</h1>
//       <div className="w-full">
//         <div className="flex justify-center mb-6">
//           <button onClick={() => handleTabChange('all')} className={`px-4 py-2 ${selectedTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
//           <button onClick={() => handleTabChange('ongoing')} className={`px-4 py-2 ${selectedTab === 'ongoing' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Ongoing</button>
//           <button onClick={() => handleTabChange('completed')} className={`px-4 py-2 ${selectedTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Completed</button>
//         </div>
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {bookedServices
//             .filter(service => 
//               selectedTab === 'all' || 
//               (selectedTab === 'ongoing' && service.status !== 'completed') ||
//               (selectedTab === 'completed' && service.status === 'completed')
//             )
//             .map((service) => (
//               <ServiceCard key={service._id} service={service} />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MapPin, MessageCircle, Clock, CreditCard,AlertCircle, ExternalLink, Loader as LoaderIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@googlemaps/js-api-loader';

export default function BookedServices() {
  const router = useRouter();
  const { token, authUser } = useAuth();
  const [bookedServices, setBookedServices] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');
  const [vendorNames, setVendorNames] = useState({});
  const [customerId, setCustomerId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [specialBookings, setSpecialBookings] = useState({});
  useEffect(() => {
    const fetchSpecialBookings = async () => {
      if (!customerId) return;
      try {
        const response = await fetch(`${process.env.API_URL}api/bookings/customer/${customerId}/special`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch special bookings');
        const data = await response.json();
        const specialBookingsMap = {};
        data.data.forEach(booking => {
          specialBookingsMap[booking.bookingDetails._id] = true;
        });
        setSpecialBookings(specialBookingsMap);
      } catch (error) {
        console.error('Error fetching special bookings:', error);
      }
    };

    fetchSpecialBookings();
  }, [customerId, token]);
  useEffect(() => {
    const fetchCustomerInfo = async () => {
      if (!authUser) return;
      try {
        const response = await fetch(`${process.env.API_URL}api/customers/customer/user/${authUser._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        console.log("Customer info API response:", data);
        setCustomerId(data._id);
        return data._id;
      } catch (error) {
        console.error('Error fetching customer info:', error);
        return null;
      }
    };

    const fetchBookings = async (customerId) => {
      try {
        const response = await fetch(`${process.env.API_URL}api/bookings/customer/${customerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
    
        const data = await response.json();
        console.log("Fetched bookings data:", data);
        setBookedServices(data);

        // Set the selected tab based on the statuses of the bookings
        const hasCompleted = data.some(booking => booking.status === 'Completed');
        const hasOngoing = data.some(booking => booking.status !== 'Completed');
        
        if (hasCompleted && hasOngoing) {
          setSelectedTab('all');
        } else if (hasCompleted) {
          setSelectedTab('completed');
        } else if (hasOngoing) {
          setSelectedTab('ongoing');
        } else {
          setSelectedTab('all');
        }
    
        // Fetch vendor info for each booking
        const vendors = {};
        for (const service of data) {
          const vendorName = await fetchVendorInfo(service.vendor.userId);
          vendors[service.vendor.userId] = vendorName;
        }
        setVendorNames(vendors);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchData = async () => {
      const customerId = await fetchCustomerInfo();
      if (customerId) {
        await fetchBookings(customerId);
      }
    };

    fetchData();
  }, [authUser, token]);

  const fetchVendorInfo = async (vendorUserId) => {
    try {
      const response = await fetch(`${process.env.API_URL}api/vendors/vendor/user/${vendorUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch vendor info');
      const data = await response.json();
      return data.userId.name;
    } catch (error) {
      console.error('Error fetching vendor info:', error);
      return 'N/A';
    }
  };

  const handleTabChange = (value) => {
    setSelectedTab(value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const ServiceCard = ({ service, vendorName, isSpecial }) => {
    // Determine the card color based on the service status
    const cardColor = service.status === 'Completed'
      ? 'bg-green-100'
      : service.status === 'Cancelled'
      ? 'bg-red-100'
      : 'bg-blue-100'; // For 'Scheduled' or other statuses
  
    return (
      <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ${cardColor} relative overflow-hidden`}>
      {isSpecial && (
        <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
          <div className="absolute top-0 left-0 w-32 bg-yellow-400 text-yellow-900 text-xs font-bold py-1 text-center transform -rotate-45 translate-x-[-30%] translate-y-[10%] shadow-md">
            SPECIAL
          </div>
        </div>
      )}
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {service.service[0].name}
          </CardTitle>
          <CardDescription className="text-gray-600">
            Start: {formatDate(service.slot.startTime)}
            <br />
            End: {formatDate(service.slot.endTime)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Vendor: {vendorName}</p>
          <p className="text-gray-700">Payment Type: {service.payment_type}</p>
          <p className="text-gray-700">Payment Status: {service.payment_status}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge variant={service.status === 'Completed' ? 'secondary' : 'default'}>
            {service.status}
          </Badge>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <ServiceDetailsModal service={service} customerId={customerId} />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    );
  };

  const ServiceDetailsModal = ({ service, customerId }) => {
    const [specialBooking, setSpecialBooking] = useState(null);
    const [isSpecialBooking, setIsSpecialBooking] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const [mapState, setMapState] = useState({
      distance: null,
      duration: null,
      error: null,
      isLoading: true
    });
  
    useEffect(() => {
      const fetchSpecialBookingDetails = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${process.env.API_URL}api/bookings/customer/${customerId}/special`);
          const data = await response.json();
          
          if (data.success && data.data.length > 0) {
            const specialBooking = data.data.find(booking => 
              booking.bookingDetails._id === service._id
            );
            console.log(specialBooking)
            if (specialBooking) {
              setIsSpecialBooking(true);
              setSpecialBooking(specialBooking);
            } else {
              setIsSpecialBooking(false);
            }
          } else {
            setIsSpecialBooking(false);
          }
        } catch (error) {
          console.error('Error fetching special booking details:', error);
          setError('Failed to fetch booking details');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchSpecialBookingDetails();
    }, [customerId, service._id]);
  
    useEffect(() => {
      if (isSpecialBooking) {
        const initializeMap = async () => {
          try {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
            
            if (!apiKey) {
              throw new Error('Google Maps API key is missing');
            }
    
            const loader = new Loader({
              apiKey,
              version: 'weekly',
              libraries: ['places']
            });
    
            const google = await loader.load();
            const mapElement = document.getElementById('map');
            
            if (!mapElement) {
              throw new Error('Map container element not found');
            }
    
            if (!specialBooking.vendorDetails.location) {
              throw new Error('Vendor location is not available');
            }
    
            const vendorLocation = {
              lat: specialBooking.vendorDetails.location.coordinates[1],
              lng: specialBooking.vendorDetails.location.coordinates[0]
            };
    
            const map = new google.maps.Map(mapElement, {
              center: vendorLocation,
              zoom: 14,
              styles: [
                {
                  featureType: "all",
                  elementType: "geometry",
                  stylers: [{ color: "#f5f5f5" }]
                },
                {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [{ color: "#ffffff" }]
                }
              ]
            });
    
            new google.maps.Marker({
              position: vendorLocation,
              map,
              title: "Service Provider",
              icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 5,
                fillColor: "#22c55e",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#16a34a",
              }
            });
    
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const customerLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };
    
                  new google.maps.Marker({
                    position: customerLocation,
                    map,
                    title: "Your Location",
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 8,
                      fillColor: "#3b82f6",
                      fillOpacity: 1,
                      strokeWeight: 2,
                      strokeColor: "#2563eb",
                    }
                  });
    
                  const directionsService = new google.maps.DirectionsService();
                  const directionsRenderer = new google.maps.DirectionsRenderer({
                    map,
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeColor: "#3b82f6",
                      strokeWeight: 4,
                      strokeOpacity: 0.8
                    }
                  });
    
                  directionsService.route({
                    origin: customerLocation,
                    destination: vendorLocation,
                    travelMode: google.maps.TravelMode.DRIVING,
                  }, (result, status) => {
                    if (status === "OK") {
                      directionsRenderer.setDirections(result);
                      const routeInfo = result.routes[0].legs[0];
                      setMapState({
                        distance: routeInfo.distance.text,
                        duration: routeInfo.duration.text,
                        error: null,
                        isLoading: false
                      });
                    }
                  });
                },
                (error) => {
                  console.warn('Geolocation error:', error);
                  setMapState({
                    isLoading: false,
                    error: null
                  });
                }
              );
            } else {
              setMapState({
                isLoading: false,
                error: null
              });
            }
    
          } catch (error) {
            console.error('Map initialization error:', error);
            setMapState({
              distance: null,
              duration: null,
              error: error.message,
              isLoading: false
            });
          }
        };
    
        initializeMap();
      }
    }, [isSpecialBooking, specialBooking]);
    
    if (isLoading) {
      return <div className="flex justify-center items-center h-64"><LoaderIcon className="animate-spin h-8 w-8" /></div>;
    }
  
    if (error) {
      return <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>;
    }
  
    return (
      <div className="bg-white p-4">
        <DialogHeader>
          <DialogTitle>{service.service[0].name}</DialogTitle>
          <DialogDescription>Service location and details</DialogDescription>
        </DialogHeader>
        <div>
          {isSpecialBooking ? (
            <div className="mt-4 space-y-4">
              {mapState.error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{mapState.error}</AlertDescription>
                </Alert>
              ) : (
                <>
                  {mapState.distance && mapState.duration && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                          <span className="text-sm">Distance: {mapState.distance}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-blue-600" />
                          <span className="text-sm">ETA: {mapState.duration}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div 
                    id="map" 
                    className="h-64 w-full rounded-lg border border-gray-200"
                  />
                </>
              )}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-gray-900">Booking Details</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Time:</span>
                      <span>{new Date(service.slot.startTime).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Time:</span>
                      <span>{new Date(service.slot.endTime).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Type:</span>
                      <span>{service.payment_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status:</span>
                      <Badge variant={service.payment_status === 'Paid' ? 'success' : 'warning'}>
                        {service.payment_status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking Status:</span>
                      <Badge variant={service.status === 'Completed' ? 'success' : 'default'}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
      
              <Button className="w-full mt-4" variant="default">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with Service Provider
              </Button>
            
            </div>
          ) : (
            <div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-gray-900">Booking Details</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Time:</span>
                      <span>{new Date(service.slot.startTime).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Time:</span>
                      <span>{new Date(service.slot.endTime).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Type:</span>
                      <span>{service.payment_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status:</span>
                      <Badge variant={service.payment_status === 'Paid' ? 'success' : 'warning'}>
                        {service.payment_status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking Status:</span>
                      <Badge variant={service.status === 'Completed' ? 'success' : 'default'}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
      
              <Button className="w-full mt-4" variant="default">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with Service Provider
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

 return (
    <div className="mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">My Booked Services</h1>
      <div className="w-full">
        <div className="flex justify-center mb-6">
          <button onClick={() => handleTabChange('all')} className={`px-4 py-2 ${selectedTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
          <button onClick={() => handleTabChange('ongoing')} className={`px-4 py-2 ${selectedTab === 'ongoing' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Ongoing</button>
          <button onClick={() => handleTabChange('completed')} className={`px-4 py-2 ${selectedTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Completed</button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookedServices
          .filter(service =>
            selectedTab === 'all' ||
            (selectedTab === 'ongoing' && service.status !== 'Completed') ||
            (selectedTab === 'completed' && service.status === 'Completed')
          )
          .map((service) => (
            <ServiceCard key={service._id} service={service} vendorName={vendorNames[service.vendor.userId] || 'N/A'}  isSpecial={specialBookings[service._id]} />
          ))}
        </div>
      </div>
    </div>
  );
}