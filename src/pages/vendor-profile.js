import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaUpload } from "react-icons/fa";
import Image from 'next/image';
import { toast } from 'sonner';

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


  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32">
              <Image
                src={vendor.profilePicture ? 
                    `${process.env.API_URL}${vendor.profilePicture.replace(/\\/g, '/')}` : 
                    "/assets/user-photo.jpg"} 
                alt="Profile picture"
                height={1000}
                width={1000}
              />
            </Avatar>
            <div className="space-y-2">
              {isEditing ? (
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              ) : (
                <h1 className="text-3xl font-bold">{formData.name}</h1>
              )}
              {isEditing ? (
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              ) : (
                <p className="text-xl text-muted-foreground">{formData.email}</p>
              )}
              {isEditing ? (
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                />
              ) : (
                <p className="text-xl text-muted-foreground">{formData.phone}</p>
              )}
              <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <div>
            <h2 className="text-2xl font-bold p-6">Profile Summary</h2>
          </div>
          <div className="p-6">
            {isEditing ? (
              <Textarea
                name="bio"
                value={formData.bio || ''}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
              />
            ) : (
              <p>{formData.bio || "No summary available"}</p>
            )}
          </div>
        </Card>

        <Card>
          <div>
            <h2 className="text-2xl font-bold p-6">Upload Profile Picture</h2>
          </div>
          <div className="p-6">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <Button type="submit" className="mt-4 flex items-center">
              <FaUpload className="mr-2" />
              Upload
            </Button>
          </div>
        </Card>

        {isEditing && (
          <Button type="submit" className="mt-4">Save Changes</Button>
        )}
      </form>
    </div>
  );
}
