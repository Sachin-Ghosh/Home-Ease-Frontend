import React from 'react';

const bookingsData = [
  {
    id: 1,
    service: "Women's Salon & Haircut",
    date: "2024-09-25",
    time: "10:00 AM",
    status: "Confirmed"
  },
  {
    id: 2,
    service: "Men's Spa",
    date: "2024-09-26",
    time: "2:00 PM",
    status: "Pending"
  },
  {
    id: 3,
    service: "AC Repair",
    date: "2024-09-27",
    time: "1:00 PM",
    status: "Cancelled"
  }
];

const Bookings = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {bookingsData.length === 0 ? (
          <p className="text-gray-600">You have no bookings at the moment.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Service</th>
                <th className="px-4 py-2 text-left text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Time</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookingsData.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-3">{booking.service}</td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3">{booking.time}</td>
                  <td className={`px-4 py-3 ${booking.status === "Confirmed" ? "text-green-500" : "text-red-500"}`}>
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Bookings;
