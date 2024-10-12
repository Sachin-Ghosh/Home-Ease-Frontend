import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function VendorBookings() {
  const { token, authUser } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/bookings/vendor/${authUser._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      console.log(data)
      setBookings(data);
    } catch (error) {
      toast.error(`Error fetching bookings: ${error.message}`);
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
              <p>Customer: {booking.customer.name}</p>
              <p>Service: {booking.service.name}</p>
              <p>Date: {new Date(booking.schedule.date).toLocaleDateString()}</p>
              <p>Time: {booking.schedule.startTime} - {booking.schedule.endTime}</p>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}