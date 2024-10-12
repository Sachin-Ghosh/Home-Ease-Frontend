
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api'; // Import InfoWindow

// Expanded static vendor data with Indian names
const vendorsData = [
    {
        _id: "66fc84afe5482f946242bae7",
        name: "Rahul Sharma",
        bio: "Spa therapist specializing in women's relaxation and rejuvenation.",
        location: {
            type: "Point",
            coordinates: [72.80797331668421, 19.47146941065867] // Same as your location
        }
    },
    {
        _id: "66fc84afe5482f946242baed",
        name: "Priya Gupta",
        bio: "Expert in aromatherapy and spa treatments for women.",
        location: {
            type: "Point",
            coordinates: [72.81297331668421, 19.47146941065867] // Nearby location
        }
    },
    {
        _id: "66fc84afe5482f946242baec",
        name: "Amit Verma",
        bio: "Personal trainer offering spa services tailored for women.",
        location: {
            type: "Point",
            coordinates: [72.80597331668421, 19.47346941065867] // Nearby location
        }
    },
    {
        _id: "66fc84afe5482f946242baeb",
        name: "Sneha Iyer",
        bio: "Nutritionist providing wellness and spa consultations for women.",
        location: {
            type: "Point",
            coordinates: [72.80697331668421, 19.47046941065867] // Nearby location
        }
    },
    {
        _id: "66fd1aef109ff43d90ef0813",
        name: "Vikram Singh",
        bio: "Fitness coach with a focus on spa and wellness for women.",
        location: {
            type: "Point",
            coordinates: [72.80497331668421, 19.47246941065867] // Nearby location
        }
    },
    {
        _id: "66fd1aef109ff43d90ef0814",
        name: "Anjali Mehta",
        bio: "Zumba instructor offering spa relaxation sessions for women.",
        location: {
            type: "Point",
            coordinates: [72.80397331668421, 19.47146941065867] // Nearby location
        }
    },
    {
        _id: "66fd1aef109ff43d90ef0815",
        name: "Karan Joshi",
        bio: "Dietitian providing nutritional advice with spa treatments for women.",
        location: {
            type: "Point",
            coordinates: [72.81097331668421, 19.47446941065867] // Nearby location
        }
    }
];

const NearbyVendors = ({ 
    
    
    
    categoryId }) => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 }); // Set default location
    const [directions, setDirections] = useState({}); // State to hold directions

    useEffect(() => {
        // Get user's location (you can use Geolocation API)
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
        });
    }, []);

    const calculateDistance = (vendorLocation) => {
        const origin = `${location.lat},${location.lng}`;
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
                        [vendorLocation.coordinates]: result.routes[0].legs[0],
                    }));
                } else {
                    console.error(`Error fetching directions: ${result}`);
                }
            }
        );
    };

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}>
            <GoogleMap
                mapContainerStyle={{ height: "400px", width: "1500px" }}
                center={location}
                zoom={16}
            >
                {vendorsData.map(vendor => (
                    <React.Fragment key={vendor._id}>
                        <MarkerF
                            position={{ lat: vendor.location.coordinates[1], lng: vendor.location.coordinates[0] }}
                            title={vendor.bio} // or any other vendor detail
                            onClick={() => calculateDistance(vendor.location)} // Calculate distance on marker click
                        />
                        <InfoWindow
                            position={{
                                lat: vendor.location.coordinates[1],
                                lng: vendor.location.coordinates[0]
                            }}
                        >
                            <div style={infoWindowStyle}>
                                <h2>{vendor.name}</h2>
                                <p>{vendor.bio}</p>
                                {directions[vendor.location.coordinates] && (
                                    <div>
                                        <p>Distance: {directions[vendor.location.coordinates].distance.text}</p>
                                        <p>Duration: {directions[vendor.location.coordinates].duration.text}</p>
                                    </div>
                                )}
                            </div>
                        </InfoWindow>
                    </React.Fragment>
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

// Styles for the InfoWindow
const infoWindowStyle = {
    padding: '2px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    fontFamily: 'Arial, sans-serif',
};

export default NearbyVendors;

