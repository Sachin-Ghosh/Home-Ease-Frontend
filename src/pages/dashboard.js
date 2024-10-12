import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VendorDashboard() {
  const { token, authUser } = useAuth();
  const [vendorData, setVendorData] = useState(null);

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
        console.log(data)
        setVendorData(data);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    if (authUser && token) {
      fetchVendorData();
    }
  }, [authUser, token]);

  if (!vendorData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Name: {vendorData.userId.name}</p>
            <p>Email: {vendorData.userId.email}</p>
            <Link href="/vendor-profile">
              <Button className="mt-2">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Services: {vendorData.services?.length || 0}</p>
            <Link href="/vendor-service">
              <Button className="mt-2">Manage Services</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/vendor-booking">
              <Button>View Bookings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}