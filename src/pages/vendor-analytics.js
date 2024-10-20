

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function VendorAnalytics() {
  const { token, authUser } = useAuth();
  const [vendorData, setVendorData] = useState(null);
  const [bookingsData, setBookingsData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [popularServices, setPopularServices] = useState(null);
  const [customerSatisfaction, setCustomerSatisfaction] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null); // New data for feedback
  const [serviceTrends, setServiceTrends] = useState(null); // New data for service trends
  const [flattenedData, setFlattenedData] = useState([]);

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
        
        const bookingsResponse = await fetch(`${process.env.API_URL}api/bookings/vendor/${data._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!bookingsResponse.ok) throw new Error('Failed to fetch bookings data');
        const bookingsData = await bookingsResponse.json();
        setBookingsData(bookingsData);
        
        // Generate analytics data
        setRevenueData(generateRevenueData(bookingsData));
        setPopularServices(generatePopularServicesData(bookingsData));
        setCustomerSatisfaction(generateCustomerSatisfactionData(bookingsData));
        setFeedbackData(generateFeedbackData(bookingsData));
        if (bookingsData) {
            const data = generateServiceTrendsData(bookingsData);
            setFlattenedData(data);
          }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (authUser && token) {
      fetchVendorData();
    }
  }, [authUser, token]);

//   useEffect(() => {
//     if (bookings) {
//       const data = generateServiceTrendsData(bookings);
//       setFlattenedData(data);
//     }
//   }, [bookings]);

  const generateRevenueData = (bookings) => {
    const monthlyRevenue = {};
    bookings.forEach(booking => {
      const date = new Date(booking.createdAt);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const revenue = booking.service[0].price; 
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
    return [
      { name: 'Satisfied', value: ratings.filter(rating => rating >= 4).length },
      { name: 'Neutral', value: ratings.filter(rating => rating === 3).length },
      { name: 'Unsatisfied', value: ratings.filter(rating => rating < 3).length },
    ];
  };

  const generateFeedbackData = (bookings) => {
    // Simulate feedback data
    return bookings.map(booking => ({
      comment: `Feedback for ${booking.service[0].name}`,
      rating: Math.floor(Math.random() * 5) + 1,
    }));
  };

//   const generateServiceTrendsData = (bookings) => {
//     const serviceTrends = {};
//     bookings.forEach(booking => {
//       const serviceName = booking.service[0].name;
//       const date = new Date(booking.createdAt);
//       const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
//       if (!serviceTrends[serviceName]) serviceTrends[serviceName] = {};
//       serviceTrends[serviceName][monthYear] = (serviceTrends[serviceName][monthYear] || 0) + 1;
//     });
//     return Object.entries(serviceTrends).map(([service, trends]) => ({
//       service,
//       trends: Object.entries(trends).map(([month, count]) => ({ month, count }))
//     }));
//   };

const generateServiceTrendsData = (bookings) => {
    const serviceTrends = {};
    bookings.forEach(booking => {
      const serviceName = booking.service[0].name;
      const date = new Date(booking.createdAt);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!serviceTrends[serviceName]) {
        serviceTrends[serviceName] = {};
      }
      
      serviceTrends[serviceName][monthYear] = (serviceTrends[serviceName][monthYear] || 0) + 1;
    });

    // Flatten the data structure for chart
    const flattenedData = [];
    Object.entries(serviceTrends).forEach(([service, trends]) => {
      Object.entries(trends).forEach(([month, count]) => {
        flattenedData.push({ month, count, service });
      });
    });

    return flattenedData;
  };

  if (!vendorData || !bookingsData || !revenueData) return <div>Loading...</div>;
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Analytics</h1>

      {/* Overall Overview */}
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p>₹{revenueData.reduce((sum, entry) => sum + entry.revenue, 0).toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{bookingsData.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
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

      {/* Popular Services Chart */}
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

      {/* Customer Satisfaction Chart */}
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

      {/* Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {feedbackData.map((feedback, index) => (
            <div key={index} className="mb-2">
              <p><strong>Comment:</strong> {feedback.comment}</p>
              <p><strong>Rating:</strong> {feedback.rating} / 5</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Service Trends Chart */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Service Trends Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={serviceTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {serviceTrends.map(serviceTrend => (
                <Line key={serviceTrend.service} type="monotone" dataKey="count" stroke="#82ca9d" />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

<Card>
  <CardHeader>
    <CardTitle>Service Trends Over Time</CardTitle>
  </CardHeader>
  <CardContent className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={flattenedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Array.from(new Set(flattenedData.map(d => d.service))).map(service => (
          <Line 
            key={service} 
            type="monotone" 
            dataKey="count" 
            stroke="#82ca9d"
            dot={false}
            // stroke={getServiceColor(service)} // Create a function to determine color
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </CardContent>
</Card>

    </div>
  );
}
