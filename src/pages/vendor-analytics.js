import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, Star, TrendingUp } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function VendorAnalytics() {
  const { token, authUser } = useAuth();
  const [vendorData, setVendorData] = useState(null);
  const [bookingsData, setBookingsData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [popularServices, setPopularServices] = useState(null);
  const [customerSatisfaction, setCustomerSatisfaction] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]); // Initialize as an empty array
  const [serviceTrends, setServiceTrends] = useState([]); // Initialize as an empty array
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

  const totalRevenue = revenueData.reduce((sum, entry) => sum + entry.revenue, 0).toFixed(2)
  const averageRating = (customerSatisfaction.reduce((sum, entry) => sum + entry.value * (entry.name === 'Satisfied' ? 5 : entry.name === 'Neutral' ? 3 : 1), 0) / 
                        customerSatisfaction.reduce((sum, entry) => sum + entry.value, 0)).toFixed(1)

  return (
    <div className="w-screen mx-auto p-4 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Vendor Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground "  />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookingsData.length}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue" className=''>Revenue</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={popularServices} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="satisfaction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSatisfaction || []} // Ensure it's an empty array if null
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerSatisfaction && customerSatisfaction.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {feedbackData.length > 0 ? ( // Check if feedbackData has items
                feedbackData.map((feedback, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold">Customer Feedback</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{feedback.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No feedback available.</p> // Message if no feedback
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
  )
}