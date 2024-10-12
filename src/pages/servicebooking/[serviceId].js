
// new working code
// import { useAuth } from '@/context/AuthContext'; 
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // Make sure this import is correct

// export default function ServiceBooking() {
//   const router = useRouter();
//   const { token, authUser } = useAuth();
//   const { serviceId, serviceName, vendorName, price, description, subcategoryName, vendorId } = router.query;
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [schedule, setSchedule] = useState(null);
//   const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isSpecialDialogOpen, setIsSpecialDialogOpen] = useState(false);
//   const [bookingType, setBookingType] = useState(null);
//   const [confirmedBooking, setConfirmedBooking] = useState(null);
//   const [duration, setDuration] = useState('');
//   const [customerName, setCustomerName] = useState('');

//   const [customerId, setCustomerId] = useState('');
//   // const { user } = useAuth();

//   const handlePayNow = () => {
//     if (!confirmedBooking) {
//       alert('Please confirm a booking first.');
//       return;
//     }
  
//     const currentDate = new Date();
    
//     const bookingDetails = {
//       id: Math.random().toString(36).substr(2, 9), // Generate a random ID
//       name: serviceName,
//       date: currentDate.toISOString().split('T')[0],
//       time: confirmedBooking.type === 'Normal' 
//         ? `${formatTime(confirmedBooking.time.startTime)} - ${formatTime(confirmedBooking.time.endTime)}`
//         : formatDateTime(currentDate),
//       status: 'ongoing',
//       type: confirmedBooking.type.toLowerCase(),
//       vendor: vendorName,
//       duration: confirmedBooking.type === 'Special' ? duration : null,
//       endTime: confirmedBooking.type === 'Special' 
//         ? new Date(currentDate.getTime() + parseInt(duration) * 60000).toISOString()
//         : null
//     };
  
//     // Store the booking details in localStorage
//     const existingBookings = JSON.parse(localStorage.getItem('bookedServices') || '[]');
//     existingBookings.push(bookingDetails);
//     localStorage.setItem('bookedServices', JSON.stringify(existingBookings));
  
//     // Navigate to the booked history page
//     router.push('/bookedhistory');
//   };

//   useEffect(() => {
//     fetchCustomerInfo();
//     fetchSchedule();
//     if (serviceId) {
//       fetchServiceDetails();
//     }
//   }, [vendorId, authUser, serviceId]);

//   const fetchServiceDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/services/${serviceId}`);
//       const data = await response.json();
//       if (data && data.duration) {
//         setDuration(data.duration); // Set the duration from the service API
//       }
//     } catch (error) {
//       console.error('Error fetching service details:', error);
//     }
//   };


//   const fetchSchedule = async () => {
//     if (!vendorId) return;
//     try {
//       const response = await fetch(`http://localhost:5000/api/schedules/vendor/${vendorId}`);
//       const data = await response.json();
//       if (data.success) {
//         setSchedule(data.schedule);
//         console.log("Fetched schedule:", data.schedule);
//       } else {
//         console.error('Failed to fetch schedule:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching schedule:', error);
//     }
//   };

//   const fetchCustomerInfo = async () => {

//       if (!authUser) return;
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
//         // console.log("Set customer ID:", data._id);
//       } else {
//         console.error('Failed to fetch customer info:', 'No customer data in response');
//       }
//     } catch (error) {
//       console.error('Error fetching customer info:', error);
//     }
//   };


//   const handleBookingClick = (type) => {
//     setBookingType(type);
//     if (type === 'Normal') {
//       setIsDialogOpen(true);
//     } else if (type === 'Special') {
//       if (schedule?.specialServiceAvailability?.isAvailable) {
//         setIsSpecialDialogOpen(true);
//       } else {
//         alert('Special booking is not available for this vendor.');
//       }
//     }
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setSelectedTime(null); // Reset selected time when date changes
//     const selectedDateString = date.toISOString().split('T')[0];
//     const availableDate = schedule?.availableDates.find(d => d.date.startsWith(selectedDateString));
//     if (availableDate) {
//       setAvailableTimeSlots(availableDate.timeSlots);
//     } else {
//       setAvailableTimeSlots([]);
//     }
//   };

//   const handleTimeSelection = (time) => {
//     setSelectedTime(time);
//   };

//   const handleConfirmBooking = async () => {
//     if (selectedDate && selectedTime) {
//       try {
//         const bookingData = {
//           vendor: vendorId,
//           availableDates: [
//             {
//               date: selectedDate.toISOString().split('T')[0],
//               timeSlots: [
//                 {
//                   startTime: new Date(selectedTime.startTime).toISOString(),
//                   endTime: new Date(selectedTime.endTime).toISOString(),
//                   isBooked: true,
//                   bookedBy: customerId
//                 }
//               ]
//             }
//           ],
//           customerId: customerId,
//           serviceId: serviceId
//         };
  
//         console.log('Sending booking data:', bookingData);
  
//         const response = await fetch('http://localhost:5000/api/schedules/normal', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify(bookingData)
//         });
  
//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error('Server error response:', errorData);
//           throw new Error(`Failed to book the slot: ${errorData.message || 'Unknown error'}`);
//         }
  
//         const result = await response.json();
//         console.log('Booking result:', result);
  
//         setConfirmedBooking({
//           type: 'Normal',
//           date: selectedDate,
//           time: selectedTime
//         });
//         setIsDialogOpen(false);
//         alert('Booking confirmed successfully!');
//       } catch (error) {
//         console.error('Error confirming booking:', error);
//         alert(`Failed to confirm booking: ${error.message}`);
//       }
//     } else {
//       alert('Please select both date and time before confirming.');
//     }
//   };

//   const isDateAvailable = (date) => {
//     if (!schedule) return false;
//     const dateString = date.toISOString().split('T')[0];
//     return schedule.availableDates.some(d => d.date.startsWith(dateString));
//   };

//   const formatTime = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

  
//     const handleSpecialBookingSubmit = async () => {
//       if (!vendorId || !serviceId || !customerId) {
//         alert('Missing required information. Please try again.');
//         return;
//       }
    
//       const currentDateTime = new Date();
      
//       const bookingRequest = {
//         vendor: vendorId,
//         serviceId: serviceId,
//         startTime: currentDateTime.toISOString(),
//         customerId: customerId
//       };
    
//       console.log('Sending booking request:', bookingRequest);
    
//       try {
//         const response = await fetch('http://localhost:5000/api/schedules/request', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify(bookingRequest),
//         });
    
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
//         }
    
//         const result = await response.json();
//         console.log("Special booking request created successfully:", result);
    
//         setConfirmedBooking({
//           type: 'Special',
//           date: currentDateTime,
//           status: 'Requested'
//         });
    
//         setIsSpecialDialogOpen(false);
//         alert("Special booking request sent successfully!");
//       } catch (error) {
//         console.error("Error creating special booking request:", error);
//         alert(`Error creating special booking request: ${error.message}`);
//       }
//     };

//   const formatDateTime = (date) => {
//     return date.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };
//   return (
//     <div className="mx-auto px-4 py-8 h-screen bg-white w-screen">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Service Information Section */}
//         <div className='flex flex-col justify-center items-center'>
//           <h1 className="text-3xl font-bold mb-4">{serviceName}</h1>
//           <Image
//             src="/placeholder.svg?height=300&width=400"
//             alt={serviceName}
//             width={400}
//             height={300}
//             className="rounded-lg mb-4"
//           />
//           <p className="text-gray-600 mb-4 text-center textarea-info">
//             {description}
//           </p>
//           <Card>
//             <CardHeader>
//               <CardTitle>Service Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="list-disc pl-5">
//                 <li>Subcategory: {subcategoryName}</li>
//                 <li>Vendor: {vendorName}</li>
//                 <li>Price: ${price}</li>
//               </ul>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Booking Section */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Schedule Service</h2>
//           <div className="space-y-4">
//             {/* Normal Booking Dialog */}
//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//   <DialogTrigger asChild>
//     <Button variant="outline" className="w-full" onClick={() => handleBookingClick('Normal')}>Normal Booking</Button>
//   </DialogTrigger>
//   <DialogContent className="sm:max-w-[425px] bg-white">
//     <DialogHeader>
//       <DialogTitle>Schedule Normal Booking</DialogTitle>
//       <DialogDescription>
//         Choose a date and time for your service.
//       </DialogDescription>
//     </DialogHeader>
//     <div className="flex flex-col items-center gap-4 py-4">
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleDateChange}
//         inline
//         className="rounded-md border"
//         dayClassName={(date) => {
//           return isDateAvailable(date) ? "bg-green-500 text-white rounded-full" : undefined;
//         }}
//       />
//       {selectedDate && (
//         <div className="grid grid-cols-3 gap-2 w-full mt-4">
//           {availableTimeSlots.map((slot) => (
//             <Button 
//               key={slot._id} 
//               variant={selectedTime === slot ? "default" : "outline"} 
//               className="w-full"
//               onClick={() => handleTimeSelection(slot)}
//             >
//               {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
//             </Button>
//           ))}
//         </div>
//       )}
//       {selectedDate && selectedTime && (
//         <Button onClick={handleConfirmBooking} className="w-full mt-4">
//           Confirm Booking
//         </Button>
//       )}
//     </div>
//   </DialogContent>
// </Dialog>

//             {/* Special Booking Dialog */}
//             {schedule?.specialServiceAvailability?.isAvailable && (
//     <Dialog open={isSpecialDialogOpen} onOpenChange={setIsSpecialDialogOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="w-full" onClick={() => setIsSpecialDialogOpen(true)}>
//           Special Booking
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px] bg-white">
//         <DialogHeader>
//           <DialogTitle className='bg-white'>Schedule Special Booking</DialogTitle>
//           <DialogDescription>
//             Enter details for your special service.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="flex flex-col gap-4 py-4">
//           <p><strong>Service:</strong> {serviceName}</p>
//           <p><strong>Vendor:</strong> {vendorName}</p>
//           <p><strong>Customer:</strong> {customerName || 'Not available'} (ID: {customerId || 'Not available'})</p>
//           <p><strong>Duration:</strong> {duration} minutes</p>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Start Date and Time
//             </label>
//             <p className="mt-1 text-sm text-gray-500">{formatDateTime(new Date())}</p>
//           </div>
//           <Button onClick={handleSpecialBookingSubmit} className="w-full mt-4">
//             Confirm Special Booking
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )}

//           </div>

//           {/* Confirmed Booking Display */}
//           {confirmedBooking && (
//   <div className="mt-8 p-4 bg-green-100 rounded-lg">
//     <h3 className="text-xl font-semibold mb-2">Confirmed Booking</h3>
//     <p>Type: {confirmedBooking.type} Booking</p>
//     <p>Date: {confirmedBooking.date.toDateString()}</p>
//     {confirmedBooking.type === 'Normal' ? (
//       <p>Time: {formatTime(confirmedBooking.time.startTime)} - {formatTime(confirmedBooking.time.endTime)}</p>
//     ) : (
//       <>
// <p>Start Time: {formatDateTime(confirmedBooking.date)}</p>
//         <p>Duration: {duration} minutes</p>
//         <p>Status: {confirmedBooking.status}</p>
//       </>
//     )}
//   </div>
// )}

//           {/* Payment Button */}
//           <Button className="w-full mt-8 bg-blue-500 text-white" onClick={handlePayNow}>Pay Now</Button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ServiceBooking() {
  const router = useRouter();
  const { token, authUser } = useAuth();
  const { serviceId, serviceName, vendorName, price, description, subcategoryName, vendorId } = router.query;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSpecialDialogOpen, setIsSpecialDialogOpen] = useState(false);
  const [bookingType, setBookingType] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [duration, setDuration] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState('');

  useEffect(() => {
    fetchCustomerInfo();
    fetchSchedule();
  }, [vendorId, authUser]);

  const fetchSchedule = async () => {
    if (!vendorId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/schedules/vendor/${vendorId}`);
      const data = await response.json();
      if (data.success) {
        setSchedule(data.schedule);
        console.log("Fetched schedule:", data.schedule);
      } else {
        console.error('Failed to fetch schedule:', data.message);
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

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
      if (data) {
        setCustomerName(data.userId.name);
        setCustomerId(data._id);
        console.log("Set customer name:", data.name);
        console.log("Set customer ID:", data._id);
      } else {
        console.error('Failed to fetch customer info:', 'No customer data in response');
      }
    } catch (error) {
      console.error('Error fetching customer info:', error);
    }
  };

  const handleBookingClick = (type) => {
    setBookingType(type);
    if (type === 'Normal') {
      setIsDialogOpen(true);
    } else if (type === 'Special') {
      if (schedule?.specialServiceAvailability?.isAvailable) {
        setIsSpecialDialogOpen(true);
      } else {
        alert('Special booking is not available for this vendor.');
      }
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    const selectedDateString = date.toISOString().split('T')[0];
    const availableDate = schedule?.availableDates.find(d => d.date.startsWith(selectedDateString));
    if (availableDate) {
      setAvailableTimeSlots(availableDate.timeSlots);
    } else {
      setAvailableTimeSlots([]);
    }
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = async () => {
    if (selectedDate && selectedTime) {
      try {
        const bookingData = {
          vendor: vendorId,
          availableDates: [
            {
              date: selectedDate.toISOString().split('T')[0],
              timeSlots: [
                {
                  startTime: new Date(selectedTime.startTime).toISOString(),
                  endTime: new Date(selectedTime.endTime).toISOString(),
                  isBooked: true,
                  bookedBy: customerId
                }
              ]
            }
          ],
          customerId: customerId,
          serviceId: serviceId
        };

        console.log('Sending booking data:', bookingData);

        const response = await fetch('http://localhost:5000/api/schedules/normal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(bookingData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Server error response:', errorData);
          throw new Error(`Failed to book the slot: ${errorData.message || 'Unknown error'}`);
        }

        const result = await response.json();
        console.log('Booking result:', result);

        setConfirmedBooking({
          type: 'Normal',
          date: selectedDate,
          time: selectedTime,
          scheduleId: result.schedule._id // Assuming the API returns the schedule ID
        });
        setIsDialogOpen(false);
        alert('Booking confirmed successfully!');
      } catch (error) {
        console.error('Error confirming booking:', error);
        alert(`Failed to confirm booking: ${error.message}`);
      }
    } else {
      alert('Please select both date and time before confirming.');
    }
  };

  const handleSpecialBookingSubmit = async () => {
    if (!vendorId || !serviceId || !customerId) {
      alert('Missing required information. Please try again.');
      return;
    }
  
    const currentDateTime = new Date();
    
    const bookingRequest = {
      vendor: vendorId,
      serviceId: serviceId,
      startTime: currentDateTime.toISOString(),
      customerId: customerId
    };
  
    console.log('Sending booking request:', bookingRequest);
  
    try {
      const response = await fetch('http://localhost:5000/api/schedules/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingRequest),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
  
      const result = await response.json();
      console.log("Special booking request created successfully:", result);
  
      setConfirmedBooking({
        type: 'Special',
        date: currentDateTime,
        status: 'Requested',
        scheduleId: result.schedule ? result.schedule._id : result._id // Fallback to result._id if schedule is not present
      });
  
      setIsSpecialDialogOpen(false);
      alert("Special booking request sent successfully!");
    } catch (error) {
      console.error("Error creating special booking request:", error);
      alert(`Error creating special booking request: ${error.message}`);
    }
  };

  const handlePayNow = () => {
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    if (!paymentType) {
      alert('Please select a payment type');
      return;
    }
  
    try {
      const bookingData = {
        customer: customerId,
        service: [serviceId], // Assuming it's an array in your model
        vendor: vendorId,
        schedule: confirmedBooking.scheduleId,
        slot: {
          startTime: confirmedBooking.time 
            ? confirmedBooking.time.startTime 
            : confirmedBooking.date.toISOString(),
          endTime: confirmedBooking.time 
            ? confirmedBooking.time.endTime 
            : new Date(confirmedBooking.date.getTime() + (duration * 60000)).toISOString(),
        },
        payment_type: paymentType,
        payment_status: "Unpaid", // You can change this if payment is processed immediately
        status: "Scheduled"
      };
  
      console.log('Sending booking data:', bookingData);
  
      const response = await fetch('http://localhost:5000/api/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create booking: ${errorData.message || 'Unknown error'}`);
      }
  
      const result = await response.json();
      console.log('Booking created:', result);
  
      setIsPaymentModalOpen(false);
      router.push('/bookedhistory');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(`Failed to create booking: ${error.message}`);
    }
  };

  const isDateAvailable = (date) => {
    if (!schedule) return false;
    const dateString = date.toISOString().split('T')[0];
    return schedule.availableDates.some(d => d.date.startsWith(dateString));
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="mx-auto px-4 py-8 h-screen bg-white w-screen">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Service Information Section */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{serviceName}</h1>
          <Image
            src="/path-to-your-image.jpg" // Replace with actual image path
            alt={serviceName}
            width={400}
            height={300}
            className="rounded-lg mb-4"
          />
          <p className="text-gray-600 mb-4 text-center textarea-info">
            {description}
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Subcategory: {subcategoryName}</li>
                <li>Vendor: {vendorName}</li>
                <li>Price: ${price}</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Booking Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Schedule Service</h2>
          <div className="space-y-4">
            {/* Normal Booking Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full" onClick={() => handleBookingClick('Normal')}>Normal Booking</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Schedule Normal Booking</DialogTitle>
                  <DialogDescription>
                    Choose a date and time for your service.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                    className="rounded-md border"
                    dayClassName={(date) => {
                      return isDateAvailable(date) ? "bg-green-500 text-white rounded-full" : undefined;
                    }}
                  />
                  {selectedDate && (
                    <div className="grid grid-cols-3 gap-2 w-full mt-4">
                      {availableTimeSlots.map((slot) => (
                        <Button 
                          key={slot._id} 
                          variant={selectedTime === slot ? "default" : "outline"} 
                          className="w-full"
                          onClick={() => handleTimeSelection(slot)}
                        >
                          {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                        </Button>
                      ))}
                    </div>
                  )}
                  {selectedDate && selectedTime && (
                    <Button onClick={handleConfirmBooking} className="w-full mt-4">
                      Confirm Booking
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Special Booking Dialog */}
            {schedule?.specialServiceAvailability?.isAvailable && (
              <Dialog open={isSpecialDialogOpen} onOpenChange={setIsSpecialDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" onClick={() => setIsSpecialDialogOpen(true)}>
                    Special Booking
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                    <DialogTitle className='bg-white'>Schedule Special Booking</DialogTitle>
                    <DialogDescription>
                      Enter details for your special service.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <p><strong>Service:</strong> {serviceName}</p>
                    <p><strong>Vendor:</strong> {vendorName}</p>
                    <p><strong>Customer:</strong> {customerName || 'Not available'} (ID: {customerId || 'Not available'})</p>
                    <p><strong>Duration:</strong> {duration} minutes</p>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date and Time
                      </label>
                      <p className="mt-1 text-sm text-gray-500">{formatDateTime(new Date())}</p>
                    </div>
                    <Button onClick={handleSpecialBookingSubmit} className="w-full mt-4">
                      Confirm Special Booking
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Confirmed Booking Display */}
          {confirmedBooking && (
            <div className="mt-8 p-4 bg-green-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Confirmed Booking</h3>
              <p>Type: {confirmedBooking.type} Booking</p>
              <p>Date: {confirmedBooking.date.toDateString()}</p>
              {confirmedBooking.type === 'Normal' ? (
                <p>Time: {formatTime(confirmedBooking.time.startTime)} - {formatTime(confirmedBooking.time.endTime)}</p>
              ) : (
                <>
                  <p>Start Time: {formatDateTime(confirmedBooking.date)}</p>
                  <p>Duration: {duration} minutes</p>
                  <p>Status: {confirmedBooking.status}</p>
                </>
              )}
            </div>
          )}

          {/* Payment Button */}
          <Button className="w-full mt-8 bg-blue-500 text-white" onClick={handlePayNow}>Pay Now</Button>

          {/* Payment Modal */}
         {/* Payment Modal */}
<Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
  <DialogContent className="sm:max-w-[425px] bg-white">
    <DialogHeader>
      <DialogTitle>Payment Details</DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="paymentType" className="text-right">
          Payment Type
        </label>
        <select
          id="paymentType"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="col-span-3 p-2 border rounded"
        >
          <option value="">Select payment type</option>
          <option value="Cash On Delivery">Cash On Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <Button onClick={handleConfirmPayment} className="w-full mt-4">
        Confirm Payment
      </Button>
    </div>
  </DialogContent>
</Dialog>
        </div>
      </div>
    </div>
  );
}