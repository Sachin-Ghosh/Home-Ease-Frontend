import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
    <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Manage Your Schedule</h1>
            
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Select Special Service</h2>
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={selectedSpecialService || ''}
                    onChange={(e) => handleSpecialServiceSelect(e.target.value)}
                >
                    <option value="">Select a service</option>
                    {services.map(service => (
                        <option key={service._id} value={service._id}>{service.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="toggle toggle-primary"
                        checked={isSpecialAvailable}
                        onChange={toggleSpecialAvailability}
                        disabled={!selectedSpecialService}
                    />
                    <span className="ml-2 label-text">Available for Special Bookings</span>
                </label>
            </div>

      <Calendar
        localizer={localizer}
        events={schedule}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        selectable
        className="mb-4"
      />

      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Add Availability</h3>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="service">
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service._id} value={service._id}>{service.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="startTime">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="endTime">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={() => setIsModalVisible(false)}
                  className="btn btn-outline mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorScheduleManager;