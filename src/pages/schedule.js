import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { Clock, Calendar as CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'


const localizer = momentLocalizer(moment);

const VendorScheduleManager = () => {
    const router = useRouter();
    const { token, authUser } = useAuth();
  const [services, setServices] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSpecialAvailable, setIsSpecialAvailable] = useState(false);
  const [selectedSpecialService, setSelectedSpecialService] = useState(null);
  const [formData, setFormData] = useState({
    service: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
      fetchVendorInfo();
      fetchServices();
      fetchSchedule();
      fetchSpecialAvailability();
  }, [vendorId, authUser ]);

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
        setVendorName(data.userId.name);
        setVendorId(data._id);
        console.log("Set vendor name:", data.name);
        console.log("Set vendor ID:", data._id);
      } else {
        console.error('Failed to fetch vendor info:', 'No vendor data in response');
      }
    } catch (error) {
      console.error('Error fetching vendor info:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/services/vendor/${vendorId}`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      console.log(data);
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      // You might want to add a UI notification here
    }
  };

  const fetchSchedule = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/schedules/vendor/${vendorId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch schedule');
      const data = await response.json();
      console.log('Fetched schedule data:', data);
      
      if (data && data.success && data.schedule && Array.isArray(data.schedule.availableDates)) {
        const formattedSchedule = data.schedule.availableDates.flatMap(dateObj => 
          (dateObj.timeSlots || []).map(slot => ({
            start: new Date(slot.startTime),
            end: new Date(slot.endTime),
            title: slot.isBooked ? 'Booked' : 'Available',
          }))
        );
        setSchedule(formattedSchedule);
      } else {
        console.error('Invalid or empty schedule data structure:', data);
        setSchedule([]);
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setSchedule([]);
      // You might want to add a UI notification here
    }
  };

  const fetchSpecialAvailability = async () => {
    try {
        const response = await fetch(`${process.env.API_URL}api/schedules/vendor/${vendorId}`);
        if (!response.ok) throw new Error('Failed to fetch special availability');
        const data = await response.json();
        setIsSpecialAvailable(data.schedule.specialServiceAvailability.isAvailable);
        // If there's a selected special service, update it here
        if (data.schedule.specialServiceAvailability.serviceId) {
            setSelectedSpecialService(data.schedule.specialServiceAvailability.serviceId);
        }
    } catch (error) {
        console.error('Error fetching special availability:', error);
    }
};

const handleSpecialServiceSelect = async (serviceId) => {
    try {
        const response = await fetch(`${process.env.API_URL}api/schedules/special`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                vendor: vendorId,
                serviceId: serviceId,
                isAvailable: false, // Initially set to false
            }),
        });

        if (!response.ok) throw new Error('Failed to select special service');
        const data = await response.json();
        console.log(data)
        setSelectedSpecialService(serviceId);
        // You might want to show a success message here
    } catch (error) {
        console.error('Error selecting special service:', error);
        // You might want to show an error message here
    }
};

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setIsModalVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const { service, startTime, endTime } = formData;
    const newSlot = {
      date: moment(selectedDate).format('YYYY-MM-DD'),
      timeSlots: [{
        startTime: moment(selectedDate).set({
          hour: moment(startTime, 'HH:mm').hour(),
          minute: moment(startTime, 'HH:mm').minute()
        }).toISOString(),
        endTime: moment(selectedDate).set({
          hour: moment(endTime, 'HH:mm').hour(),
          minute: moment(endTime, 'HH:mm').minute()
        }).toISOString(),
      }],
    };
    
    await createOrUpdateSchedule(newSlot, service);
    setIsModalVisible(false);
    setFormData({ service: '', startTime: '', endTime: '' });
  };

  const createOrUpdateSchedule = async (newSlot, serviceId) => {
    try {
      const response = await fetch(`${process.env.API_URL}api/schedules/normal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vendor: vendorId,
          availableDates: [newSlot],
          serviceId,
        }),
      });

      if (!response.ok) throw new Error('Failed to update schedule');
      
      // You might want to add a UI notification here for success
      fetchSchedule(); // Refresh the schedule
    } catch (error) {
      console.error('Error updating schedule:', error);
      // You might want to add a UI notification here for failure
    }
  };

  const toggleSpecialAvailability = async () => {
    if (!selectedSpecialService) {
        // Show an error message or alert
        console.error('Please select a special service first');
        return;
    }

    try {
        const response = await fetch(`${process.env.API_URL}api/schedules/special-service/toggle`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                vendor: vendorId,
                isAvailable: !isSpecialAvailable,
            }),
        });

        if (!response.ok) throw new Error('Failed to toggle special availability');
        const data = await response.json();
        console.log(data)
        setIsSpecialAvailable(!isSpecialAvailable);
        // You might want to show a success message here
    } catch (error) {
        console.error('Error toggling special availability:', error);
        // You might want to show an error message here
    }
};

return (
  <div className="w-screen mx-auto p-4 bg-white">
    <h1 className="text-3xl font-bold mb-6 text-blue-600">Manage Your Schedule</h1>
    
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-blue-600">Special Service Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Select onValueChange={handleSpecialServiceSelect} value={selectedSpecialService || ''}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {services.map(service => (
                <SelectItem key={service._id} value={service._id}>{service.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch
              id="special-availability"
              checked={isSpecialAvailable}
              onCheckedChange={toggleSpecialAvailability}
              disabled={!selectedSpecialService}
            />
            <Label htmlFor="special-availability">Available for Special Bookings</Label>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-blue-600">Your Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          localizer={localizer}
          events={schedule}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectSlot={handleSelectSlot}
          selectable
          className="rounded-md border"
        />
      </CardContent>
    </Card>

    <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Add Availability</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleModalSubmit} className="space-y-4">
          <Select name="service" onValueChange={(value) => handleInputChange({ target: { name: 'service', value } })} value={formData.service}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map(service => (
                <SelectItem key={service._id} value={service._id}>{service.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <Input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <Input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
)
}

export default VendorScheduleManager;
