import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from 'sonner'
import { Camera, MapPin, Phone, Mail, User, Save } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function VendorProfile() {
  const router = useRouter();
  const { token, authUser } = useAuth();
  const [vendorName, setVendorName] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [vendor, setVendor] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    location: { type: 'Point', coordinates: [0, 0] },
    profilePicture: null,
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchVendorInfo();
    if (authUser) {
      setFormData(prevData => ({
        ...prevData,
        name: authUser.name,
        email: authUser.email,
        bio: vendor.bio,
      }));
      setLoading(false);
    }
  }, [vendorId,authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      location: {
        ...prevData.location,
        coordinates: name === 'longitude' 
          ? [parseFloat(value), prevData.location.coordinates[1]]
          : [prevData.location.coordinates[0], parseFloat(value)],
      },
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  const fetchVendorInfo = async () => {
    if (!authUser) return;
    try {
      const response = await fetch(`${process.env.API_URL}api/vendors/vendor/user/${authUser._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      console.log("Vendor info API response:", data);
      if (data) {
        setVendor(data);
        setVendorName(data.userId.name);
        setVendorId(data._id);
        // console.log("Set vendor name:", data.name);
        // console.log("Set vendor ID:", data._id);
      } else {
        console.error('Failed to fetch vendor info:', 'No vendor data in response');
      }
    } catch (error) {
      console.error('Error fetching vendor info:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = { ...formData, vendorId: vendorId }; // Add vendorId to updatedProfile
      const formDataToUpload = new FormData();

      if (updatedProfile.profilePicture) {
        formDataToUpload.append('profilePicture', updatedProfile.profilePicture);
        formDataToUpload.append('vendorId', updatedProfile.vendorId); // Add vendorId here
      }

      // Update profile picture
      if (updatedProfile.profilePicture) {
        const response = await fetch(`${process.env.API_URL}api/vendors/upload-profile-pic`, {
          method: 'POST',
          body: formDataToUpload,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to upload profile picture');
        toast.success('Profile picture uploaded successfully');
      }

      // Update other profile data
      const response = await fetch(`${process.env.API_URL}api/vendors/${vendorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
};


return (
  <div className="w-screen h-full mx-auto p-4 space-y-6 bg-white">
    <Card className="overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
          <h1 className="text-3xl font-bold text-white">{formData.name}</h1>
          <p className="text-xl text-white/80">{formData.email}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <Avatar className="w-32 h-32">
          <Image
            src={vendor.profilePicture ? 
                `${process.env.API_URL}${vendor.profilePicture.replace(/\\/g, '/')}` : 
                "/assets/user-photo.jpg"} 
            alt="Profile picture"
            height={1000}
            width={1000}
            layout="responsive" // Optional: Use layout prop for responsive images
          />
        </Avatar>
          <div className="space-y-2 text-center md:text-left">
            <p className="text-lg text-gray-600 flex items-center justify-center md:justify-start">
              <MapPin className="mr-2 h-5 w-5 text-blue-500" />
              {formData.location.coordinates.join(', ')}
            </p>
            <p className="text-lg text-gray-600 flex items-center justify-center md:justify-start">
              <Phone className="mr-2 h-5 w-5 text-blue-500" />
              {formData.phone}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="edit">Edit Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{formData.bio || "No summary available"}</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="edit">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone Number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  value={formData.location.coordinates[0]}
                  onChange={handleLocationChange}
                  placeholder="Longitude"
                  step="any"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  value={formData.location.coordinates[1]}
                  onChange={handleLocationChange}
                  placeholder="Latitude"
                  step="any"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <Input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
)
}
