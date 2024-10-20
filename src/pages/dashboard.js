// import { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// export default function VendorDashboard() {
//   const { token, authUser } = useAuth();
//   const [vendorData, setVendorData] = useState(null);

//   useEffect(() => {
//     const fetchVendorData = async () => {
//       try {
//         const response = await fetch(`${process.env.API_URL}api/vendors/vendor/user/${authUser._id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) throw new Error('Failed to fetch vendor data');
//         const data = await response.json();
//         console.log(data)
//         setVendorData(data);
//       } catch (error) {
//         console.error('Error fetching vendor data:', error);
//       }
//     };

//     if (authUser && token) {
//       fetchVendorData();
//     }
//   }, [authUser, token]);

//   if (!vendorData) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Profile</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>Name: {vendorData.userId.name}</p>
//             <p>Email: {vendorData.userId.email}</p>
//             <Link href="/vendor-profile">
//               <Button className="mt-2">Edit Profile</Button>
//             </Link>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Services</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>Total Services: {vendorData.services?.length || 0}</p>
//             <Link href="/vendor-service">
//               <Button className="mt-2">Manage Services</Button>
//             </Link>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Bookings</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Link href="/vendor-booking">
//               <Button>View Bookings</Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// export default function VendorDashboard() {
//   const { token, authUser } = useAuth();
//   const [vendorData, setVendorData] = useState(null);
//   const [bookingsData, setBookingsData] = useState(null);
//   const [revenueData, setRevenueData] = useState(null);

//   useEffect(() => {
//     const fetchVendorData = async () => {
//       try {
//         const response = await fetch(`${process.env.API_URL}api/vendors/vendor/user/${authUser._id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) throw new Error('Failed to fetch vendor data');
//         const data = await response.json();
//         setVendorData(data);
        
//         // Fetch bookings data
//         const bookingsResponse = await fetch(`${process.env.API_URL}api/bookings/vendor/${data._id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         if (!bookingsResponse.ok) throw new Error('Failed to fetch bookings data');
//         const bookingsData = await bookingsResponse.json();
//         console.log(bookingsData)
//         setBookingsData(bookingsData);
        
//         // Generate mock revenue data
//         const revenueData = generateMockRevenueData();
//         setRevenueData(revenueData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (authUser && token) {
//       fetchVendorData();
//     }
//   }, [authUser, token]);

//   const generateMockRevenueData = () => {
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     return months.map(month => ({
//       month,
//       revenue: Math.floor(Math.random() * 10000) + 1000,
//     }));
//   };

//   if (!vendorData || !bookingsData || !revenueData) return <div>Loading...</div>;

//   const completedBookings = bookingsData.filter(booking => booking.status === 'Completed').length;
//   const cancelledBookings = bookingsData.filter(booking => booking.status === 'Cancelled').length;
//   const scheduledBookings = bookingsData.filter(booking => booking.status === 'Scheduled').length;

//   const bookingStatusData = [
//     { name: 'Completed', value: completedBookings },
//     { name: 'Cancelled', value: cancelledBookings },
//     { name: 'Scheduled', value: scheduledBookings },
//   ];

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Profile</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>Name: {vendorData.userId.name}</p>
//             <p>Email: {vendorData.userId.email}</p>
//             <p>Total Services: {vendorData.services?.length || 0}</p>
//             <p>Rating: {vendorData.rating.toFixed(1)} / 5</p>
//             <Link href="/vendor-profile">
//               <Button className="mt-2">Edit Profile</Button>
//             </Link>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Bookings Overview</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>Total Bookings: {bookingsData.length}</p>
//             <p>Completed: {completedBookings}</p>
//             <p>Cancelled: {cancelledBookings}</p>
//             <p>Scheduled: {scheduledBookings}</p>
//             <Link href="/vendor-booking">
//               <Button className="mt-2">View Bookings</Button>
//             </Link>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-2">
//             <Link href="/vendor-service">
//               <Button className="w-full">Manage Services</Button>
//             </Link>
//             <Link href="/vendor-schedule">
//               <Button className="w-full">Update Schedule</Button>
//             </Link>
//             <Link href="/vendor-analytics">
//               <Button className="w-full">View Detailed Analytics</Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Monthly Revenue</CardTitle>
//           </CardHeader>
//           <CardContent className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={revenueData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="revenue" fill="#8884d8" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Booking Status Distribution</CardTitle>
//           </CardHeader>
//           <CardContent className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={bookingStatusData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {bookingStatusData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>
      
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Bookings</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {bookingsData.slice(0, 5).map((booking, index) => (
//                 <tr key={index}>
//                   <td className="px-6 py-4 whitespace-nowrap">{booking.service[0].name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.createdAt).toLocaleDateString()}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">${booking.service[0].price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function VendorDashboard() {
  const { token, authUser } = useAuth();
  const [vendorData, setVendorData] = useState(null);
  const [bookingsData, setBookingsData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [popularServices, setPopularServices] = useState(null);
  const [customerSatisfaction, setCustomerSatisfaction] = useState(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}api/vendors/vendor/user/${authUser._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch vendor data');
        const data = await response.json();
        setVendorData(data);
        
        // Fetch bookings data
        const bookingsResponse = await fetch(`${process.env.API_URL}api/bookings/vendor/${data._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!bookingsResponse.ok) throw new Error('Failed to fetch bookings data');
        const bookingsData = await bookingsResponse.json();
        setBookingsData(bookingsData);
        
        // Generate revenue data based on bookings
        const revenueData = generateRevenueData(bookingsData);
        setRevenueData(revenueData);

        // Generate popular services data
        const popularServices = generatePopularServicesData(bookingsData);
        setPopularServices(popularServices);

        // Generate customer satisfaction data
        const satisfactionData = generateCustomerSatisfactionData(bookingsData);
        setCustomerSatisfaction(satisfactionData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (authUser && token) {
      fetchVendorData();
    }
  }, [authUser, token]);

  const generateRevenueData = (bookings) => {
    const monthlyRevenue = {};
    bookings.forEach(booking => {
      const date = new Date(booking.createdAt);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const revenue = booking.service[0].price; // Assuming single service per booking
      monthlyRevenue[monthYear] = (monthlyRevenue[monthYear] || 0) + revenue;
    });

    return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue
    })).sort((a, b) => a.month.localeCompare(b.month));
  };
  const generatePopularServicesData = (bookings) => {
    const serviceCount = {};
    bookings.forEach(booking => {
      const serviceName = booking.service[0].name;
      serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1;
    });
    return Object.entries(serviceCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const generateCustomerSatisfactionData = (bookings) => {
    const ratings = bookings.map(() => Math.floor(Math.random() * 5) + 1);
    const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    return [
      { name: 'Satisfied', value: ratings.filter(rating => rating >= 4).length },
      { name: 'Neutral', value: ratings.filter(rating => rating === 3).length },
      { name: 'Unsatisfied', value: ratings.filter(rating => rating < 3).length },
    ];
  };

  if (!vendorData || !bookingsData || !revenueData) return <div>Loading...</div>;

  const completedBookings = bookingsData.filter(booking => booking.status === 'Completed').length;
  const cancelledBookings = bookingsData.filter(booking => booking.status === 'Cancelled').length;
  const scheduledBookings = bookingsData.filter(booking => booking.status === 'Scheduled').length;

  const bookingStatusData = [
    { name: 'Completed', value: completedBookings },
    { name: 'Cancelled', value: cancelledBookings },
    { name: 'Scheduled', value: scheduledBookings },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Name: {vendorData.userId.name}</p>
            <p>Email: {vendorData.userId.email}</p>
            <p>Total Services: {vendorData.services?.length || 0}</p>
            <p>Rating: 4.3 / 5</p>
            <Link href="/vendor-profile">
              <Button className="mt-2">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bookings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Bookings: {bookingsData.length}</p>
            <p>Completed: {completedBookings}</p>
            <p>Cancelled: {cancelledBookings}</p>
            <p>Scheduled: {scheduledBookings}</p>
            <Link href="/vendor-booking">
              <Button className="mt-2">View Bookings</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/vendor-service">
              <Button className="w-full">Manage Services</Button>
            </Link>
            <Link href="/schedule">
              <Button className="w-full">Update Schedule</Button>
            </Link>
            <Link href="/vendor-analytics">
              <Button className="w-full">View Detailed Analytics</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Booking Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Popular Services and Customer Satisfaction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Popular Services</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularServices} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSatisfaction}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {customerSatisfaction.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookingsData.slice(0, 5).map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.service[0].name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{booking.service[0].price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}