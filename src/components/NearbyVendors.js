
// import React, { useEffect, useState } from 'react';
// import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api'; // Import InfoWindow

// // Expanded static vendor data with Indian names
// const vendorsData = [
//     {
//         _id: "66fc84afe5482f946242bae7",
//         name: "Rahul Sharma",
//         bio: "Spa therapist specializing in women's relaxation and rejuvenation.",
//         location: {
//             type: "Point",
//             coordinates: [72.80797331668421, 19.47146941065867] // Same as your location
//         }
//     },
//     {
//         _id: "66fc84afe5482f946242baed",
//         name: "Priya Gupta",
//         bio: "Expert in aromatherapy and spa treatments for women.",
//         location: {
//             type: "Point",
//             coordinates: [72.81297331668421, 19.47146941065867] // Nearby location
//         }
//     },
//     {
//         _id: "66fc84afe5482f946242baec",
//         name: "Amit Verma",
//         bio: "Personal trainer offering spa services tailored for women.",
//         location: {
//             type: "Point",
//             coordinates: [72.80597331668421, 19.47346941065867] // Nearby location
//         }
//     },
//     {
//         _id: "66fc84afe5482f946242baeb",
//         name: "Sneha Iyer",
//         bio: "Nutritionist providing wellness and spa consultations for women.",
//         location: {
//             type: "Point",
//             coordinates: [72.80697331668421, 19.47046941065867] // Nearby location
//         }
//     },
//     {
//         _id: "66fd1aef109ff43d90ef0813",
//         name: "Vikram Singh",
//         bio: "Fitness coach with a focus on spa and wellness for women.",
//         location: {
//             type: "Point",
//             coordinates: [72.80497331668421, 19.47246941065867] // Nearby location
//         }
//     },
//     {
//         _id: "66fd1aef109ff43d90ef0814",
//         name: "Anjali Mehta",
//         bio: "Zumba instructor offering spa relaxation sessions for women.",
//         location: {
//             type: "Point",
//             coordinates: [72.80397331668421, 19.47146941065867] // Nearby location
//         }
//     },
//     {
//         _id: "66fd1aef109ff43d90ef0815",
//         name: "Karan Joshi",
//         bio: "Dietitian providing nutritional advice with spa treatments for women.",
//         location: {
//             type: "Point",
//             coordinates: [72.81097331668421, 19.47446941065867] // Nearby location
//         }
//     }
// ];

// const NearbyVendors = ({ 
    
    
    
//     services }) => {
//     const [location, setLocation] = useState({ lat: 0, lng: 0 }); // Set default location
//     const [directions, setDirections] = useState({}); // State to hold directions

//     useEffect(() => {
//         // Get user's location (you can use Geolocation API)
//         navigator.geolocation.getCurrentPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setLocation({ lat: latitude, lng: longitude });
//         });
//     }, []);

//     const calculateDistance = (vendorLocation) => {
//         const origin = `${location.lat},${location.lng}`;
//         const destination = `${vendorLocation.coordinates[1]},${vendorLocation.coordinates[0]}`;
//         const directionsService = new window.google.maps.DirectionsService();

//         directionsService.route(
//             {
//                 origin: origin,
//                 destination: destination,
//                 travelMode: window.google.maps.TravelMode.DRIVING,
//             },
//             (result, status) => {
//                 if (status === window.google.maps.DirectionsStatus.OK) {
//                     setDirections((prev) => ({
//                         ...prev,
//                         [vendorLocation.coordinates]: result.routes[0].legs[0],
//                     }));
//                 } else {
//                     console.error(`Error fetching directions: ${result}`);
//                 }
//             }
//         );
//     };

//     return (
//         <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}>
//             <GoogleMap
//                 mapContainerStyle={{ height: "400px", width: "1500px" }}
//                 center={location}
//                 zoom={16}
//             >
//                 {vendorsData.map(vendor => (
//                     <React.Fragment key={vendor._id}>
//                         <MarkerF
//                             position={{ lat: vendor.location.coordinates[1], lng: vendor.location.coordinates[0] }}
//                             title={vendor.bio} // or any other vendor detail
//                             onClick={() => calculateDistance(vendor.location)} // Calculate distance on marker click
//                         />
//                         <InfoWindow
//                             position={{
//                                 lat: vendor.location.coordinates[1],
//                                 lng: vendor.location.coordinates[0]
//                             }}
//                         >
//                             <div style={infoWindowStyle}>
//                                 <h2>{vendor.name}</h2>
//                                 <p>{vendor.bio}</p>
//                                 {directions[vendor.location.coordinates] && (
//                                     <div>
//                                         <p>Distance: {directions[vendor.location.coordinates].distance.text}</p>
//                                         <p>Duration: {directions[vendor.location.coordinates].duration.text}</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </InfoWindow>
//                     </React.Fragment>
//                 ))}
//             </GoogleMap>
//         </LoadScript>
//     );
// };

// // Styles for the InfoWindow
// const infoWindowStyle = {
//     padding: '2px',
//     backgroundColor: '#fff',
//     borderRadius: '5px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//     fontFamily: 'Arial, sans-serif',
// };

// export default NearbyVendors;
// import React, { useEffect, useState, useCallback } from 'react';
// import { GoogleMap, LoadScript, MarkerF, OverlayView } from '@react-google-maps/api';

// const NearbyVendors = ({ services, vendorNames }) => {
//     const [userLocation, setUserLocation] = useState({ lat: 19.4585847, lng: 72.7946657 });
//     const [vendors, setVendors] = useState([]);
//     const [selectedVendor, setSelectedVendor] = useState(null);
//     const [directions, setDirections] = useState({});
//     const [map, setMap] = useState(null);

//     const onLoad = useCallback((map) => {
//         setMap(map);
//         console.log('Map loaded successfully');
//     }, []);

//     const CustomInfoWindow = ({ vendor, onClose }) => (
//         <OverlayView
//             position={{
//                 lat: vendor.location.coordinates[1],
//                 lng: vendor.location.coordinates[0]
//             }}
//             mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//         >
//             <div style={customInfoWindowStyle}>
//                 <h1 className='font-extrabold text-xl text-secondary-content'>{vendor.name}</h1>
//                 <p><strong>Services:</strong></p>
//                 <ul>
//                     {vendor.services.map((service, index) => (
//                         <li key={index} className='text-success text-sm'> {service.name} - ₹{service.price}</li>
//                     ))}
//                 </ul>
//                 {/* <p><strong>Bio:</strong> {vendor.bio}</p> */}
//                 {directions[vendor.location.coordinates.join(',')] && (
//                     <div>
//                         <p className='text-error '><strong>Distance:</strong> {directions[vendor.location.coordinates.join(',')].distance.text}</p>
//                         <p  className='text-error '><strong>Duration:</strong> {directions[vendor.location.coordinates.join(',')].duration.text}</p>
//                     </div>
//                 )}
//                 <button onClick={onClose} style={closeButtonStyle}>Close</button>
//             </div>
//         </OverlayView>
//     );

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 setUserLocation({ lat: latitude, lng: longitude });
//                 console.log('User location set:', { lat: latitude, lng: longitude });
//             },
//             (error) => {
//                 console.error('Error getting location:', error);
//                 alert('Unable to get your location. Using default location.');
//             }
//         );

//         const uniqueVendors = services.reduce((acc, service) => {
//             const vendorId = typeof service.vendor === 'object' ? service.vendor._id : service.vendor;
//             if (!acc[vendorId]) {
//                 acc[vendorId] = {
//                     _id: vendorId,
//                     name: vendorNames[vendorId] || `Unknown Vendor`,
//                     bio: typeof service.vendor === 'object' ? service.vendor.bio : '',
//                     location: typeof service.vendor === 'object' ? service.vendor.location : null,
//                     services: []
//                 };
//             }
//             acc[vendorId].services.push({
//                 name: service.name,
//                 price: service.price
//             });
//             return acc;
//         }, {});

//         setVendors(Object.values(uniqueVendors));
//     }, [services, vendorNames]);

//     useEffect(() => {
//         if (map) {
//             const bounds = new window.google.maps.LatLngBounds();
//             vendors.forEach(vendor => {
//                 if (vendor.location && vendor.location.coordinates) {
//                     bounds.extend(new window.google.maps.LatLng(
//                         vendor.location.coordinates[1],
//                         vendor.location.coordinates[0]
//                     ));
//                 }
//             });
//             bounds.extend(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));
//             map.fitBounds(bounds);
//         }
//     }, [map, vendors, userLocation]);

//     const calculateDistance = (vendorLocation) => {
//         if (!vendorLocation || !vendorLocation.coordinates) return;

//         const origin = `${userLocation.lat},${userLocation.lng}`;
//         const destination = `${vendorLocation.coordinates[1]},${vendorLocation.coordinates[0]}`;
//         const directionsService = new window.google.maps.DirectionsService();

//         directionsService.route(
//             {
//                 origin: origin,
//                 destination: destination,
//                 travelMode: window.google.maps.TravelMode.DRIVING,
//             },
//             (result, status) => {
//                 if (status === window.google.maps.DirectionsStatus.OK) {
//                     setDirections((prev) => ({
//                         ...prev,
//                         [vendorLocation.coordinates.join(',')]: result.routes[0].legs[0],
//                     }));
//                 } else {
//                     console.error(`Error fetching directions: ${result}`);
//                 }
//             }
//         );
//     };



//     return (
//         <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}>
//             <GoogleMap
//                 mapContainerStyle={{ height: "400px", width: "100%" }}
//                 center={userLocation}
//                 zoom={14}
//                 onLoad={setMap}
//             >
//                 {vendors.map(vendor => {
//                     if (vendor.location && vendor.location.coordinates) {
//                         const lat = vendor.location.coordinates[1];
//                         const lng = vendor.location.coordinates[0];
//                         return (
//                             <MarkerF
//                                 key={vendor._id}
//                                 position={{ lat, lng }}
//                                 onClick={() => {
//                                     setSelectedVendor(vendor);
//                                     calculateDistance(vendor.location);
//                                 }}
//                             />
//                         );
//                     }
//                     return null;
//                 })}

//                 {selectedVendor && selectedVendor.location && (
//                     <CustomInfoWindow
//                         vendor={selectedVendor}
//                         onClose={() => setSelectedVendor(null)}
//                     />
//                 )}
//             </GoogleMap>
//         </LoadScript>
//     );
// };

// const customInfoWindowStyle = {
//     background: 'white',
//     border: '1px solid #ccc',
//     padding: '15px',
//     boxShadow: '0 2px 7px 1px rgba(0,0,0,0.3)',
//     borderRadius: '5px',
//     maxWidth: '300px', // Set a maximum width to ensure it's rectangular
//     maxHeight: '400px', // Set a maximum height to prevent overflow
//     width: '300px',     // Force the width to be consistent
//     height: 'auto',     // Let the height adjust to the content
//     overflowY: 'auto',  // Add scroll behavior if content overflows vertically
//     zIndex: 1000,
//     position: 'relative', // Position relative for close button
// };


// const closeButtonStyle = {
//     position: 'absolute',
//     top: '5px',
//     right: '5px',
//     background: 'none',
//     border: 'none',
//     fontSize: '16px',
//     cursor: 'pointer',
// };

// export default NearbyVendors;


import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView } from '@react-google-maps/api';

const NearbyVendors = ({ services, vendorNames }) => {
    const [userLocation, setUserLocation] = useState({ lat: 19.4585847, lng: 72.7946657 });
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [directions, setDirections] = useState({});
    const [map, setMap] = useState(null);

    // Replace LoadScript with useJsApiLoader
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    });

    const onLoad = useCallback((map) => {
        setMap(map);
        console.log('Map loaded successfully');
    }, []);

    const CustomInfoWindow = ({ vendor, onClose }) => (
        <OverlayView
            position={{
                lat: vendor.location.coordinates[1],
                lng: vendor.location.coordinates[0]
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
            <div style={customInfoWindowStyle}>
                <h1 className='font-extrabold text-xl text-secondary-content'>{vendor.name}</h1>
                <p><strong>Services:</strong></p>
                <ul>
                    {vendor.services.map((service, index) => (
                        <li key={index} className='text-success text-sm'> {service.name} - ₹{service.price}</li>
                    ))}
                </ul>
                {directions[vendor.location.coordinates.join(',')] && (
                    <div>
                        <p className='text-error'><strong>Distance:</strong> {directions[vendor.location.coordinates.join(',')].distance.text}</p>
                        <p className='text-error'><strong>Duration:</strong> {directions[vendor.location.coordinates.join(',')].duration.text}</p>
                    </div>
                )}
                <button onClick={onClose} style={closeButtonStyle}>Close</button>
            </div>
        </OverlayView>
    );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                console.log('User location set:', { lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Using default location.');
            }
        );

        const uniqueVendors = services.reduce((acc, service) => {
            const vendorId = typeof service.vendor === 'object' ? service.vendor._id : service.vendor;
            if (!acc[vendorId]) {
                acc[vendorId] = {
                    _id: vendorId,
                    name: vendorNames[vendorId] || `Unknown Vendor`,
                    bio: typeof service.vendor === 'object' ? service.vendor.bio : '',
                    location: typeof service.vendor === 'object' ? service.vendor.location : null,
                    services: []
                };
            }
            acc[vendorId].services.push({
                name: service.name,
                price: service.price
            });
            return acc;
        }, {});

        setVendors(Object.values(uniqueVendors));
    }, [services, vendorNames]);

    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            vendors.forEach(vendor => {
                if (vendor.location && vendor.location.coordinates) {
                    bounds.extend(new window.google.maps.LatLng(
                        vendor.location.coordinates[1],
                        vendor.location.coordinates[0]
                    ));
                }
            });
            bounds.extend(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));
            map.fitBounds(bounds);
        }
    }, [map, vendors, userLocation]);

    const calculateDistance = useCallback((vendorLocation) => {
        if (!vendorLocation || !vendorLocation.coordinates) return;

        const origin = `${userLocation.lat},${userLocation.lng}`;
        const destination = `${vendorLocation.coordinates[1]},${vendorLocation.coordinates[0]}`;
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections((prev) => ({
                        ...prev,
                        [vendorLocation.coordinates.join(',')]: result.routes[0].legs[0],
                    }));
                } else {
                    console.error(`Error fetching directions: ${result}`);
                }
            }
        );
    }, [userLocation]);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={userLocation}
            zoom={14}
            onLoad={onLoad}
        >
            {vendors.map(vendor => {
                if (vendor.location && vendor.location.coordinates) {
                    const lat = vendor.location.coordinates[1];
                    const lng = vendor.location.coordinates[0];
                    return (
                        <MarkerF
                            key={vendor._id}
                            position={{ lat, lng }}
                            onClick={() => {
                                setSelectedVendor(vendor);
                                calculateDistance(vendor.location);
                            }}
                        />
                    );
                }
                return null;
            })}

            {selectedVendor && selectedVendor.location && (
                <CustomInfoWindow
                    vendor={selectedVendor}
                    onClose={() => setSelectedVendor(null)}
                />
            )}
        </GoogleMap>
    );
};

const customInfoWindowStyle = {
    background: 'white',
    border: '1px solid #ccc',
    padding: '15px',
    boxShadow: '0 2px 7px 1px rgba(0,0,0,0.3)',
    borderRadius: '5px',
    maxWidth: '300px',
    maxHeight: '400px',
    width: '300px',
    height: 'auto',
    overflowY: 'auto',
    zIndex: 1000,
    position: 'relative',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
};

export default NearbyVendors;