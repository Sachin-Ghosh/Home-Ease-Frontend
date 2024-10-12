import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function VendorInfoPage() {
  const router = useRouter();
  const { token, authUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    services: [],
    geo_location: { lat: "", lng: "" },
  });

  useEffect(() => {
    if (authUser) {
      setFormData(prevData => ({
        ...prevData,
        name: authUser.name,
        email: authUser.email,
        // Fetch additional vendor data if needed
      }));
    }
  }, [authUser]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Save the location to state
          setFormData(prevData => ({
            ...prevData,
            geo_location: { lat: latitude, lng: longitude },
          }));
          toast("Location retrieved successfully.");
        },
        (error) => {
          toast(`Error retrieving location: ${error.message}`);
        }
      );
    } else {
      toast("Geolocation is not supported by this browser.");
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
  
    // Validate that latitude and longitude are set
    if (!formData.geo_location.lat || !formData.geo_location.lng) {
      toast("Please retrieve your current location.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.API_URL}api/vendors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: authUser._id,
          services: formData.services,
          bio: formData.bio,
          geo_location: formData.geo_location // Include lat/lng
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
  
      toast("Profile updated successfully.");
      router.push('/dashboard');
    } catch (error) {
      toast(`Error: ${error.message}`);
    }
  }
  

  return (
    <div className="p-4 w-full container mx-auto space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Vendor Information</CardTitle>
          <CardDescription>Update your vendor details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div>
              <label>Name</label>
              <Input placeholder="Vendor Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label>Email</label>
              <Input placeholder="vendor@example.com" type="email" value={formData.email} readOnly />
            </div>
            <div>
              <label>Phone</label>
              <Input placeholder="123-456-7890" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <label>Bio</label>
              <Textarea placeholder="Tell us about your business" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
            </div>
            <div>
              <label>Services Offered</label>
              <Input placeholder="List your services" value={formData.services.join(", ")} onChange={(e) => setFormData({ ...formData, services: e.target.value.split(", ") })} />
            </div>
            <div>
              <Button type="button" onClick={getLocation}>Get Current Location</Button>
            </div>
            <Button type="submit">Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}