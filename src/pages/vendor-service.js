import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function VendorServices() {
  const router = useRouter();
  const { token, authUser } = useAuth();
  const [services, setServices] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [categories, setCategories] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    subcategory: '',
    photos: [],
  });
  const [selectedService, setSelectedService] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    fetchVendorInfo();
    fetchServices();
    fetchCategories();
  }, [vendorId, authUser]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewService((prev) => ({
      ...prev,
      photos: files
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
      // console.log("Vendor info API response:", data);
      if (data) {
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
  
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/services/services/categorys`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchServices = async () => {
    if (!vendorId) return;
    try {
      const response = await fetch(`${process.env.API_URL}api/services/vendor/${vendorId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      // If no services found, show empty message
      if (data.length === 0) {
        setServices([]);  // Explicitly set empty array
    } else {
        setServices(data);
    }
      // console.log("Services API response:", data);
    //   setServices(data);
    } catch (error) {
      toast.error(`Error fetching services: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

 
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
      
//       // Append service details
//       formData.append('name', newService.name);
//       formData.append('description', newService.description);
//       formData.append('category', newService.category);
//       formData.append('subcategory', newService.subcategory);
//       formData.append('price', newService.price);
//       formData.append('duration', newService.duration);
      
//       // Append vendorId
//       formData.append('vendor', vendorId);  // Add vendorId to the form data
  
//       // Append photos (if any)
//       if (newService.photos.length > 0) {
//         Array.from(newService.photos).forEach((file) => {
//           formData.append('photos', file);
//         });
//       }
  
//       // Log form data for debugging (remove after testing)
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }
  
//       const response = await fetch(`${process.env.API_URL}api/services/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });
  
//       // Log the response for debugging
//       console.log('Response status:', response.status);
//       console.log('Response content:', await response.text());
  
//       if (!response.ok) throw new Error('Failed to create service');
      
//       toast.success('Service created successfully');
//       fetchServices(); // Refresh the services after creation
//       setNewService({ name: '', description: '', price: '', duration: '', photos: [] });
      
//     } catch (error) {
//       toast.error(`Error creating service: ${error.message}`);
//     }
//   };
  

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    
    // Append service details
    Object.keys(newService).forEach(key => {
      if (key !== 'photos') {
        formData.append(key, newService[key]);
      }
    });
    
    // Append vendorId
    formData.append('vendor', vendorId);

    // Append photos
    newService.photos.forEach((file, index) => {
      formData.append(`photos`, file);
    });

    const response = await fetch(`${process.env.API_URL}api/services/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to create service');
    
    toast.success('Service created successfully');
    fetchServices();
    setNewService({ name: '', description: '', price: '', duration: '', category: '', subcategory: '', photos: [] });
    
  } catch (error) {
    toast.error(`Error creating service: ${error.message}`);
  }
};


const handleUpdateService = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    
    // Append service details
    Object.keys(selectedService).forEach(key => {
      if (key !== 'photos' && key !== '_id') {
        if (key === 'category' || key === 'subcategory') {
          formData.append(key, selectedService[key]._id || selectedService[key]);
        } else {
          formData.append(key, selectedService[key]);
        }
      }
    });

    // Append photos
    if (selectedService.photos) {
      selectedService.photos.forEach((photo, index) => {
        if (photo instanceof File) {
          formData.append(`photos`, photo);
        } else if (typeof photo === 'string') {
          formData.append(`existingPhotos`, photo);
        }
      });
    }

    // console.log('Updating service with ID:', selectedService._id);
    // console.log('Form data:', Object.fromEntries(formData));

    const response = await fetch(`${process.env.API_URL}api/services/${selectedService._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update service');
    }
    
    const updatedService = await response.json();
    // console.log('Updated service:', updatedService);

    toast.success('Service updated successfully');
    fetchServices();
    setIsUpdateModalOpen(false);
    
  } catch (error) {
    console.error('Error updating service:', error);
    toast.error(`Error updating service: ${error.message}`);
  }
};

const handleDeleteService = async (serviceId) => {
  try {
    const response = await fetch(`${process.env.API_URL}api/services/${serviceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to delete service');
    
    toast.success('Service deleted successfully');
    fetchServices();
    
  } catch (error) {
    toast.error(`Error deleting service: ${error.message}`);
  }
};
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Services</h2>
          {services.length === 0 ? (
                    <p className="text-gray-500">There are no services created by the vendor.</p>
                ) : (
                    services.map(service => (
                        <Card key={service._id} className="mb-4">
                            <CardHeader>
                                <CardTitle>{service.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{service.description}</p>
                                <p>Price: ₹{service.price}</p>
                                <p>Duration: {service.duration} minutes</p>
                                <div className="mt-2">
                                  <Button onClick={() => {
                                    setSelectedService(service);
                                    setIsUpdateModalOpen(true);
                                  }} className="mr-2">Update</Button>
                                  <Button variant="destructive" onClick={() => handleDeleteService(service._id)}>Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Add New Service</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                name="name"
                placeholder="Service Name"
                value={newService.name}
                onChange={handleInputChange}
                required
            />
            <Textarea
                name="description"
                placeholder="Description"
                value={newService.description}
                onChange={handleInputChange}
                required
            />
            <select
                name="category"
                value={newService.category}
                onChange={handleInputChange}
                required
            >
                <option value="">Select Category</option>
                {categories.map(category => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
                ))}
            </select>

            {/* Subcategory dropdown */}
            <select
                name="subcategory"
                value={newService.subcategory}
                onChange={handleInputChange}
            >
                <option value="">Select Subcategory</option>
                {categories
                .find(cat => cat._id === newService.category)?.subCategories.map(sub => (
                    <option key={sub._id} value={sub._id}>
                    {sub.name}
                    </option>
                ))}
            </select>

            <Input
                name="price"
                type="number"
                placeholder="Price"
                value={newService.price}
                onChange={handleInputChange}
                required
            />
            <Input
                name="duration"
                type="number"
                placeholder="Duration (minutes)"
                value={newService.duration}
                onChange={handleInputChange}
                required
            />
            
            {/* Photo upload */}
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            
            <Button  type="submit">Add Service</Button>
            </form>

        </div>
      </div>
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdateService} className="space-y-4">
          <Input
            name="name"
            placeholder="Service Name"
            value={selectedService?.name || ''}
            onChange={(e) => setSelectedService({...selectedService, name: e.target.value})}
            required
          />
          <Textarea
            name="description"
            placeholder="Description"
            value={selectedService?.description || ''}
            onChange={(e) => setSelectedService({...selectedService, description: e.target.value})}
            required
          />
          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={selectedService?.price || ''}
            onChange={(e) => setSelectedService({...selectedService, price: e.target.value})}
            required
          />
          <Input
            name="duration"
            type="number"
            placeholder="Duration (minutes)"
            value={selectedService?.duration || ''}
            onChange={(e) => setSelectedService({...selectedService, duration: e.target.value})}
            required
          />
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const newPhotos = Array.from(e.target.files);
              setSelectedService(prev => ({
                ...prev,
                photos: [...(prev.photos || []), ...newPhotos]
              }));
            }}
          />
          <select
            name="category"
            value={selectedService?.category?._id || selectedService?.category || ''}
            onChange={(e) => setSelectedService({...selectedService, category: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            name="subcategory"
            value={selectedService?.subcategory?._id || selectedService?.subcategory || ''}
            onChange={(e) => setSelectedService({...selectedService, subcategory: e.target.value})}
            required
          >
            <option value="">Select Subcategory</option>
            {categories
              .find(cat => cat._id === (selectedService?.category?._id || selectedService?.category))
              ?.subCategories.map(sub => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
          </select>

          {selectedService?.photos && selectedService.photos.map((photo, index) => (
            <div key={index} className="flex items-center">
              <span>{typeof photo === 'string' ? photo : photo.name}</span>
              <Button 
                type="button" 
                onClick={() => {
                  setSelectedService(prev => ({
                    ...prev,
                    photos: prev.photos.filter((_, i) => i !== index)
                  }));
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="submit">Update Service</Button>
        </form>
      </DialogContent>
    </Dialog>


    </div>
  );
}