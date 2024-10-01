import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function PersonalInfoPage() {
  const router = useRouter();
  const { token, authUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    geo_location: { lat: "", lng: "" },
  });

  useEffect(() => {
    if (authUser) {
      setFormData(prevData => ({
        ...prevData,
        name: authUser.name,
        email: authUser.email,
        // Fetch additional user data if needed
      }));
    }
  }, [authUser]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use the location as needed, e.g., save it to state or send it to the server
          setFormData(prevData => ({
            ...prevData,
            geo_location: { lat: latitude, lng: longitude },
          }));
          console.log("Got location");
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
    try {
      const response = await fetch(`${process.env.API_URL}api/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            userId: authUser._id,
            ...formData
          }),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      toast("Profile updated successfully.");
      router.push('/homePage');
    } catch (error) {
      toast(`Error: ${error.message}`);
    }
  }

  return (
    <div className="p-4 w-full container mx-auto space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div>
              <label>Name</label>
              <Input placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label>Email</label>
              <Input placeholder="johndoe@example.com" type="email" value={formData.email} readOnly />
            </div>
            <div>
              <label>Phone</label>
              <Input placeholder="123-456-7890" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <label>Bio</label>
              <Textarea placeholder="Tell us about yourself" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
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