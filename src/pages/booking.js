// import { useRouter } from 'next/router';
// import React, { useState } from 'react';

// const BookingPage = () => {
//   const router = useRouter();
//   const { vendorName, location, serviceName } = router.query;
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle the appointment submission logic here (e.g., save to database)
//     console.log('Booking Details:', { vendorName, location, serviceName, date, time });
//     // Redirect or show a success message
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">Book Appointment</h1>
//       <h2 className="text-xl mt-4">Vendor: {vendorName}</h2>
//       <p>Location: {location}</p>
//       <p>Service: {serviceName}</p>

//       <form onSubmit={handleSubmit} className="mt-6">
//         <label className="block mb-2">
//           Select Date:
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="ml-2 p-2 border border-gray-300 rounded"
//             required
//           />
//         </label>
//         <label className="block mb-2">
//           Select Time:
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className="ml-2 p-2 border border-gray-300 rounded"
//             required
//           />
//         </label>
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//           Confirm Booking
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookingPage;

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const BookingPage = () => {
  const router = useRouter();
  const { vendorName, serviceName } = router.query; // Assuming vendorName is vendor ID

  const [vendorDetails, setVendorDetails] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [customerId, setCustomerId] = useState(''); // assuming the customer ID is available

  // Static scheduleId - passed but not visible
  const scheduleId = '66fd4603989dfc3c1ace6182'; // This is static

  // Fetch the customerId from authenticated user
  useEffect(() => {
    // Simulate fetching the customerId from user auth
    const signedInCustomerId = 'customer12345'; // Replace with actual logic to get customer ID
    setCustomerId(signedInCustomerId);
  }, []);

  // Fetch vendor details using vendor ID
  useEffect(() => {
    const fetchVendorDetails = async () => {
      if (vendorName) {
        try {
          const response = await fetch(`${process.env.API_URL}api/vendors/${vendorName}`);
          const data = await response.json();
          setVendorDetails(data);
        } catch (error) {
          console.error('Error fetching vendor details:', error);
        }
      }
    };

    fetchVendorDetails();
  }, [vendorName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the booking object matching your schema
    const bookingData = {
      customer: customerId, // Use the fetched customer ID
      service: [serviceName], // Assuming serviceName is the ID of the service
      vendor: vendorName, // Use the vendor ID
      scheduleId, // The static scheduleId
      slot: {
        startTime: time, // Selected time as startTime
        endTime: new Date(new Date(time).getTime() + 60 * 60 * 1000).toISOString(), // End time +1 hour
      },
      payment_status: 'Unpaid',
      status: 'Scheduled',
    };

    try {
      // Use fetch to make a POST request
      const response = await fetch(`${process.env.API_URL}api/bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to make booking');
      }

      const result = await response.json();
      console.log('Booking Successful:', result);
      // Handle success (e.g., redirect or show success message)

    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle errors (e.g., show error message)
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Book Appointment</h1>

      {/* Display Vendor Name and Location if available */}
      {vendorDetails ? (
        <>
          <h2 className="text-xl mt-4">Vendor: {vendorDetails.name}</h2>
          <p>Location: {vendorDetails.location}</p>
        </>
      ) : (
        <p>Loading vendor details...</p>
      )}

      <p>Service: {serviceName}</p>

      <form onSubmit={handleSubmit} className="mt-6">
        {/* Date Input */}
        <label className="block mb-2">
          Select Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="ml-2 p-2 border border-gray-300 rounded"
            required
          />
        </label>

        {/* Time Input */}
        <label className="block mb-2">
          Select Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="ml-2 p-2 border border-gray-300 rounded"
            required
          />
        </label>

        {/* Submit Button */}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
