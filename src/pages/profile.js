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
import Link from 'next/link';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { token, authUser } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [authUser]);

  const fetchProfile = async () => {
    if (!authUser) return;
    try {
      const response = await fetch(`${process.env.API_URL}api/customers/customer/user/${authUser._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      console.log(data);
      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
      setLoading(false);
    }
  };

  const handleInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update profile data
      const updatedProfile = { ...profile };
      if (file) {
        const formData = new FormData();
        formData.append('customerId', profile._id);
        formData.append('profilePicture', file);

        const response = await fetch(`${process.env.API_URL}api/customers/upload-profile-pic`, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to upload profile picture');
        toast.success('Profile picture uploaded successfully');
      }

      // Update other profile data
      const response = await fetch(`${process.env.API_URL}api/customers/${profile._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProfile)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      toast.success('Profile updated successfully');
      fetchProfile(); // Refresh profile data
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Error loading profile.</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="w-32 h-32">
            <Image 
              src={`${process.env.API_URL}${profile.profilePicture ? profile.profilePicture.replace(/\\/g, '/') : "/assets/user-photo.jpg"}`} 
              alt="Profile picture" 
              height={1000} 
              width={1000} 
            />
          </Avatar>
            <div className="space-y-2">
              {isEditing ? (
                <Input
                  value={profile.userId.name}
                  onChange={(e) => handleInputChange(e, 'userId.name')}
                  placeholder="Name"
                />
              ) : (
                <h1 className="text-3xl font-bold">{profile.userId.name}</h1>
              )}
              {isEditing ? (
                <Input
                  value={profile.userId.email}
                  onChange={(e) => handleInputChange(e, 'userId.email')}
                  placeholder="Email"
                  type="email"
                />
              ) : (
                <p className="text-xl text-muted-foreground">{profile.userId.email}</p>
              )}
              {isEditing ? (
                <Input
                  value={profile.phone}
                  onChange={(e) => handleInputChange(e, 'phone')}
                  placeholder="Phone"
                />
              ) : (
                <p className="text-xl text-muted-foreground">{profile.phone}</p>
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
                value={profile.bio || ''}
                onChange={(e) => handleInputChange(e, 'bio')}
                placeholder="Tell us about yourself"
              />
            ) : (
              <p>{profile.bio || "No summary available"}</p>
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