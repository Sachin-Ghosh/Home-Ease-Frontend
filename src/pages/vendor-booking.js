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
import { Calendar, Clock, DollarSign, MapPin, MessageSquare, Package, User } from 'lucide-react';
import ChatModal from '@/components/ChatModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function VendorBookings() {
  const router = useRouter();
  const { token, authUser } = useAuth();
  const [vendorName, setVendorName] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [customerNames, setCustomerNames] = useState({});
  const [showLocationTracker, setShowLocationTracker] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  // New state for chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [filter, setFilter] = useState('all')
  const [filteredBookings, setFilteredBookings] = useState([])



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

  useEffect(() => {
    filterBookings()
  }, [bookings, filter])

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

  const handleChatOpen = (booking) => {
    setSelectedCustomerId(booking.customer._id);
    setSelectedBookingId(booking._id);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setSelectedCustomerId(null);
    setSelectedBookingId(null);
  };
  
  const filterBookings = () => {
    if (filter === 'all') {
      setFilteredBookings(bookings)
    } else {
      setFilteredBookings(bookings.filter(booking => booking.status.toLowerCase() === filter))
    }
  }
  
  return (
    <div className="w-screen mx-auto p-4 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Your Bookings</h1>
      <div className="mb-4">
        <Select onValueChange={setFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter bookings" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map(booking => (
          <Card key={booking._id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-600">Booking #{booking._id.slice(-6)}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="text-blue-500" />
                  <span>Customer: {customerNames[booking.customer?.userId] || 'Unknown'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="text-blue-500" />
                  <span>Service: {booking.service[0]?.name || 'Unknown'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-blue-500" />
                  <span>Date: {booking.slot?.startTime ? new Date(booking.slot.startTime).toLocaleDateString() : 'Unknown'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-blue-500" />
                  <span>Time: {booking.slot?.startTime ? `${new Date(booking.slot.startTime).toLocaleTimeString()} - ${new Date(booking.slot.endTime).toLocaleTimeString()}` : 'Unknown'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-blue-500" />
                  <span>Payment Status: {booking.payment_status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {booking.status === 'Scheduled' && (
                  <div className="flex space-x-2">
                    <Button onClick={() => handleStatusChange(booking._id, 'Completed')} className="bg-green-500 hover:bg-green-600 text-white">
                      Mark as Completed
                    </Button>
                    <Button onClick={() => handleStatusChange(booking._id, 'Cancelled')} className="bg-red-500 hover:bg-red-600 text-white">
                      Cancel Booking
                    </Button>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleChatOpen(booking)}
                    variant="outline"
                    className="flex items-center space-x-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat</span>
                  </Button>
                  <Button 
                    onClick={() => handleStartTracking(booking)} 
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Track</span>
                  </Button>
                </div>
                {booking.payment_status === 'Unpaid' && (
                  <Select onValueChange={(value) => handlePaymentStatusChange(booking._id, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Update Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showLocationTracker && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 h-3/4">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Live Location Tracking</h2>
            <VendorLocationTracker 
              bookingId={selectedBooking._id} 
              customerLocation={selectedBooking.customerLocation} 
            />
            <Button onClick={() => setShowLocationTracker(false)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
              Close
            </Button>
          </div>
        </div>
      )}

      {isChatOpen && selectedCustomerId && selectedBookingId && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={handleChatClose}
          bookingId={selectedBookingId}
          vendorId={vendorId}
          customerId={selectedCustomerId}
        />
      )}
    </div>
  )
}