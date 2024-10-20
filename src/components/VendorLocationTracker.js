// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

// const VendorLocationTracker = ({ bookingId, customerLocation }) => {
//   const [vendorLocation, setVendorLocation] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const mapRef = useRef(null);
//   const directionsService = useRef(null);

//   useEffect(() => {
//     // Initialize directions service
//     if (window.google) {
//       directionsService.current = new window.google.maps.DirectionsService();
//     }

//     // Simulating vendor's location updates
//     const intervalId = setInterval(() => {
//       // In a real scenario, this would come from a GPS or location service
//       const newLocation = {
//         lat: vendorLocation ? vendorLocation.lat + 0.001 : 19.47646283302637,
//         lng: vendorLocation ? vendorLocation.lng + 0.001 : 72.80892694308758
//       };
//       setVendorLocation(newLocation);
//       updateServerWithLocation(newLocation);
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, [vendorLocation]);

//   useEffect(() => {
//     if (vendorLocation && customerLocation && directionsService.current) {
//       const origin = new window.google.maps.LatLng(vendorLocation.lat, vendorLocation.lng);
//       const destination = new window.google.maps.LatLng(customerLocation.lat, customerLocation.lng);

//       directionsService.current.route(
//         {
//           origin: origin,
//           destination: destination,
//           travelMode: window.google.maps.TravelMode.DRIVING
//         },
//         (result, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             setDirections(result);
//           }
//         }
//       );
//     }
//   }, [vendorLocation, customerLocation]);

//   const updateServerWithLocation = async (location) => {
//     try {
//       await fetch(`${process.env.API_URL}api/bookings/bookings/${bookingId}/vendor-location`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(location)
//       });
//     } catch (error) {
//       console.error('Error updating vendor location:', error);
//     }
//   };

//   return (
//     <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}>
//       <GoogleMap
//         mapContainerStyle={{ width: '100%', height: '400px' }}
//         center={vendorLocation || { lat: 12.9716, lng: 77.5946 }}
//         zoom={14}
//         onLoad={map => (mapRef.current = map)}
//       >
//         {vendorLocation && <Marker position={vendorLocation} />}
//         {customerLocation && <Marker position={customerLocation} />}
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default VendorLocationTracker;


// VendorLocationTracker.js
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const VendorLocationTracker = ({ bookingId }) => {
  const [vendorLocation, setVendorLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const mapRef = useRef(null);
  const directionsService = useRef(null);
  const watchPositionId = useRef(null);

  useEffect(() => {
    // Initialize directions service
    if (window.google) {
      directionsService.current = new window.google.maps.DirectionsService();
    }

    // Watch vendor's location
    watchPositionId.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setVendorLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        updateVendorLocation(newLocation);
      },
      (error) => console.error('Error getting vendor location:', error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );

    // Fetch customer's location periodically
    const customerIntervalId = setInterval(fetchCustomerLocation, 5000);

    return () => {
      clearInterval(customerIntervalId);
      if (watchPositionId.current) {
        navigator.geolocation.clearWatch(watchPositionId.current);
      }
    };
  }, []);

  const updateVendorLocation = async (location) => {
    try {
      const response = await fetch(`${process.env.API_URL}api/bookings/bookings/${bookingId}/vendor-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(location)
      });
      const data = await response.json();
      if (data.distanceToCustomer) {
        setDistance(data.distanceToCustomer);
      }
    } catch (error) {
      console.error('Error updating vendor location:', error);
    }
  };

  const fetchCustomerLocation = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/bookings/bookings/${bookingId}/customer-location`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (data.currentLocation && data.currentLocation.coordinates) {
        const [lng, lat] = data.currentLocation.coordinates;
        setCustomerLocation({ lat, lng });
        setLocationHistory(data.locationHistory || []);
        
        // Update directions if both locations are available
        if (vendorLocation && directionsService.current) {
          updateDirections(vendorLocation, { lat, lng });
        }
      }
    } catch (error) {
      console.error('Error fetching customer location:', error);
    }
  };

  const updateDirections = (origin, destination) => {
    directionsService.current.route(
      {
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(destination.lat, destination.lng),
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setEstimatedTime(result.routes[0].legs[0].duration.text);
          setDistance(result.routes[0].legs[0].distance.text);
        }
      }
    );
  };

  return (
    <div className="relative">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={vendorLocation || { lat: 19.4585847, lng: 72.7946657 }}
          zoom={14}
          onLoad={map => (mapRef.current = map)}
        >
          {vendorLocation && (
            <Marker 
              position={vendorLocation}
              icon={{
                // url: '/vendor-marker.png', // Add your custom marker icon
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            />
          )}
          {customerLocation && (
            <Marker 
              position={customerLocation}
              icon={{
                // url: '/customer-marker.png', // Add your custom marker icon
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
      
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
        {estimatedTime && distance && (
          <>
            <p className="font-semibold">Estimated Time: {estimatedTime}</p>
            <p className="font-semibold">Distance: {distance}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorLocationTracker;