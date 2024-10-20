// import { useState, useEffect } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from 'next/router';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';

// export default function VendorBookings() {
//     const router = useRouter();
//   const { token, authUser } = useAuth();
//   const [vendorName, setVendorName] = useState('');
//   const [vendorId, setVendorId] = useState('');
//   const [userId, setUserId] = useState('');
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetchVendorInfo();
//     fetchBookings();
//   }, [vendorId, authUser]);

// //   useEffect(() => {
// //     fetchCustomerInfo();
// //   }, []);
  

//   const fetchVendorInfo = async () => {
//     if (!authUser) return;
//     try {
//       const response = await fetch(`${process.env.API_URL}api/vendors/vendor/user/${authUser._id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       if (!response.ok) throw new Error('Failed to fetch profile');
//       const data = await response.json();
//       console.log("Vendor info API response:", data);
//       if (data) {
//         setVendorName(data.userId.name);
//         setVendorId(data._id);
//         console.log("Set vendor name:", data.name);
//         console.log("Set vendor ID:", data._id);
//       } else {
//         console.error('Failed to fetch vendor info:', 'No vendor data in response');
//       }
//     } catch (error) {
//       console.error('Error fetching vendor info:', error);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       const response = await fetch(`${process.env.API_URL}api/bookings/vendor/${vendorId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch bookings');
//       const data = await response.json();
//       console.log(data)
//       setBookings(data);
//       setUserId(data.customer.userId)
//       console.log(data.customer.userId)
//     } catch (error) {
//       toast.error(`Error fetching bookings: ${error.message}`);
//     }
//   };

//   const handleStatusChange = async (bookingId, newStatus) => {
//     try {
//       const response = await fetch(`${process.env.API_URL}api/bookings/${bookingId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       if (!response.ok) throw new Error('Failed to update booking status');
//       toast.success('Booking status updated successfully');
//       fetchBookings();
//     } catch (error) {
//       toast.error(`Error updating booking status: ${error.message}`);
//     }
//   };

//   const fetchCustomerInfo = async () => {
//     try {
//       const response = await fetch(`${process.env.API_URL}api/customers/customer/user/${userId}`, {
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
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {bookings.map(booking => (
//         <Card key={booking._id}>
//             <CardHeader>
//             <CardTitle>Booking #{booking._id.slice(-6)}</CardTitle>
//             </CardHeader>
//             <CardContent>
//             {/* Display customer name if populated */}
//             <p>Customer: {booking.customer?.name || 'Unknown'}</p>

//             {/* Display service name if populated */}
//             <p>Service: {booking.service?.name || 'Unknown'}</p>

//             {/* Display schedule date and time if available */}
//             <p>Date: {booking.schedule ? new Date(booking.schedule.date).toLocaleDateString() : 'Unknown'}</p>
//             <p>Time: {booking.schedule ? `${new Date(booking.schedule.startTime).toLocaleTimeString()} - ${new Date(booking.schedule.endTime).toLocaleTimeString()}` : 'Unknown'}</p>

//             <p>Status: {booking.status}</p>

//             {booking.status === 'Scheduled' && (
//                 <div className="mt-2">
//                 <Button onClick={() => handleStatusChange(booking._id, 'Completed')} className="mr-2">
//                     Mark as Completed
//                 </Button>
//                 <Button onClick={() => handleStatusChange(booking._id, 'Cancelled')} variant="destructive">
//                     Cancel Booking
//                 </Button>
//                 </div>
//             )}
//             </CardContent>
//         </Card>
//         ))}

//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import VendorLocationTracker from '@/components/VendorLocationTracker';

export default function VendorBookings() {
  const router = useRouter();
  const { token, authUser } = useAuth();
  const [vendorName, setVendorName] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [customerNames, setCustomerNames] = useState({}); // Store customer names
  const [showLocationTracker, setShowLocationTracker] = useState(false);
const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (authUser) {
      fetchVendorInfo();
    }
  }, [authUser]);

  useEffect(() => {
    if (vendorId) {
      fetchBookings();
    }
  }, [vendorId]);

  const fetchVendorInfo = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/vendors/vendor/user/${authUser._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setVendorName(data.userId.name);
      setVendorId(data._id);
    } catch (error) {
      console.error('Error fetching vendor info:', error);
    }
  };
  
  const fetchBookings = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/bookings/vendor/${vendorId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);

      // Loop through each booking and fetch customer info
      data.forEach(booking => {
        const userId = booking.customer?.userId;
        if (userId) {
          fetchCustomerInfo(userId);
        }
      });
    } catch (error) {
      toast.error(`Error fetching bookings: ${error.message}`);
    }
  };

  const fetchCustomerInfo = async (userId) => {
    try {
      const response = await fetch(`${process.env.API_URL}api/customers/customer/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch customer');
      const data = await response.json();
      setCustomerNames(prevState => ({
        ...prevState,
        [userId]: data.userId.name, // Store customer name by userId
      }));
    } catch (error) {
      console.error('Error fetching customer info:', error);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`${process.env.API_URL}api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update booking status');
      toast.success('Booking status updated successfully');
      fetchBookings();
    } catch (error) {
      toast.error(`Error updating booking status: ${error.message}`);
    }
  };

  const handlePaymentStatusChange = async (bookingId, newPaymentStatus) => {
    try {
      // First fetch the current booking status
      const bookingResponse = await fetch(`${process.env.API_URL}api/bookings/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!bookingResponse.ok) throw new Error('Failed to fetch booking details');
      
      const bookingData = await bookingResponse.json();
  
      // Only allow changing the status if the current status is 'Unpaid'
      if (bookingData.payment_status === 'Unpaid') {
        const updateResponse = await fetch(`${process.env.API_URL}api/bookings/${bookingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ payment_status: newPaymentStatus }),
        });
        if (!updateResponse.ok) throw new Error('Failed to update payment status');
        toast.success('Payment status updated successfully');
        fetchBookings(); // Refresh bookings after updating
      } else {
        toast.error('Payment status can only be updated from "Unpaid" to another status.');
      }
    } catch (error) {
      toast.error(`Error updating payment status: ${error.message}`);
    }
  };

  const handleStartTracking = (booking) => {
    setSelectedBooking(booking);
    setShowLocationTracker(true);
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map(booking => (
          <Card key={booking._id}>
            <CardHeader>
              <CardTitle>Booking #{booking._id.slice(-6)}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Display customer name */}
              <p>Customer: {customerNames[booking.customer?.userId] || 'Unknown'}</p>

              {/* Display service name */}
              <p>Service: {booking.service[0]?.name || 'Unknown'}</p>

              {/* Display schedule date and time */}
              <p>Date: {booking.slot?.startTime ? new Date(booking.slot.startTime).toLocaleDateString() : 'Unknown'}</p>
              <p>Time: {booking.slot?.startTime ? `${new Date(booking.slot.startTime).toLocaleTimeString()} - ${new Date(booking.slot.endTime).toLocaleTimeString()}` : 'Unknown'}</p>

              <p>Status: {booking.status}</p>

              {booking.status === 'Scheduled' && (
                <div className="mt-2">
                  <Button onClick={() => handleStatusChange(booking._id, 'Completed')} className="mr-2">
                    Mark as Completed
                  </Button>
                  <Button onClick={() => handleStatusChange(booking._id, 'Cancelled')} variant="destructive">
                    Cancel Booking
                  </Button>
                </div>
              )}

                <p>Payment Status: {booking.payment_status}</p>
                
                {booking.payment_status === 'Unpaid' && (
                    <div className="mt-2">
                    <select 
                        onChange={(e) => handlePaymentStatusChange(booking._id, e.target.value)} 
                        defaultValue="Unpaid"
                    >
                        <option value="Unpaid" disabled>Select Payment Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                    </div>
                )}

              {/* // In your JSX, add this button to each booking card: */}
              <Button onClick={() => handleStartTracking(booking)} className="mt-2">
                Start Tracking
              </Button>

              {showLocationTracker && selectedBooking && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded-lg w-3/4 h-3/4">
      <h2 className="text-xl font-bold mb-4">Live Location Tracking</h2>
      <VendorLocationTracker 
        bookingId={selectedBooking._id} 
        customerLocation={selectedBooking.customerLocation} 
      />
      <Button onClick={() => setShowLocationTracker(false)} className="mt-4">
        Close
      </Button>
    </div>
  </div>
)}

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
