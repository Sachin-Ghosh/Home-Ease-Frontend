'use client'

import { useEffect, useState } from 'react'
import { MapPin, MessageCircle, Clock, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'

// Placeholder data for booked services
const bookedServices = [
  { id: 1, name: 'Home Cleaning', date: '2023-05-15', time: '14:00', status: 'ongoing', type: 'normal', vendor: 'CleanPro' },
  { id: 2, name: 'Plumbing Repair', date: '2023-05-16', time: '10:00', status: 'ongoing', type: 'special', vendor: 'FixIt Plumbing' },
  { id: 3, name: 'Pest Control', date: '2023-05-10', time: '09:00', status: 'completed', type: 'normal', vendor: 'BugBusters' },
  { id: 4, name: 'AC Servicing', date: '2023-05-12', time: '11:00', status: 'completed', type: 'special', vendor: 'CoolAir Services' },
]

export default function BookedServices() {
  const [selectedTab, setSelectedTab] = useState('all'); // State for selected tab
  const [selectedService, setSelectedService] = useState(null); // State for selected service

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Define the keyframes for the shine animation
      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(`
        @keyframes shine {
          0% { box-shadow: 0 0 5px red; }
          50% { box-shadow: 0 0 20px red; }
          100% { box-shadow: 0 0 5px red; }
        }
      `, styleSheet.cssRules.length);
    }
  }, []);

  const handleTabChange = (value) => {
    setSelectedTab(value);
  };

  const ServiceCard = ({ service }) => (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {service.name}
          <Badge
            style={{
              backgroundColor: service.type === 'special' ? 'red' : 'gray',
              color: 'white',
              padding: '0.5em',
              borderRadius: '0.25em',
              animation: service.type === 'special' ? 'shine 1.5s infinite' : 'none',
              boxShadow: service.type === 'special' ? '0 0 5px red' : 'none',
            }}
          >
            {service.type} booking
          </Badge>
        </CardTitle>
        <CardDescription className="text-gray-600">{service.date} at {service.time}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Vendor: {service.vendor}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant={
          service.status === 'completed' ? 'secondary' :
          service.status === 'ongoing' ? 'default' : 'outline'
        }>
          {service.status}
        </Badge>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setSelectedService(service)}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '0.25em',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                transform: 'scale(1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.backgroundColor = '#0056b3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#007bff';
              }}
            >
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            {selectedService && (selectedService.status !== 'completed' ? <OngoingServiceModal service={selectedService} /> : <CompletedServiceModal service={selectedService} />)}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )

  const OngoingServiceModal = ({ service }) => (
    <>
      <DialogHeader className='bg-white'>
        <DialogTitle>{service.name} - Ongoing</DialogTitle>
        <DialogDescription>Service details and live updates</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="h-[200px] bg-muted rounded-md flex items-center justify-center">
          Map Placeholder
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Clock className="mr-2" size={20} />
            <span>Scheduled: {service.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2" size={20} />
            <span>En route</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="mr-2" size={20} />
            <span>Payment: Completed</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Service Info</h4>
          <p>Vendor: {service.vendor}</p>
          <p>Type: {service.type} booking</p>
        </div>
        <Button className="w-full">
          <MessageCircle className="mr-2" size={20} />
          Chat with {service.vendor}
        </Button>
      </div>
    </>
  )

  const CompletedServiceModal = ({ service }) => (
    <>
      <DialogHeader className='bg-white'>
        <DialogTitle className='bg-white'>{service.name} - Completed</DialogTitle>
        <DialogDescription>Service summary</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 bg-white">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Clock className="mr-2" size={20} />
            <span>Completed: {service.time}</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="mr-2" size={20} />
            <span>Payment: Completed</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Service Info</h4>
          <p>Vendor: {service.vendor}</p>
          <p>Type: {service.type} booking</p>
        </div>
        <Button className="w-full">
          <MessageCircle className="mr-2" size={20} />
          Chat with {service.vendor}
        </Button>
      </div>
    </>
  )

  const TabsTrigger = ({ value, children }) => (
    <button
      onClick={() => handleTabChange(value)}
      className={`px-4 py-2 ${
        selectedTab === value ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">My Booked Services</h1>
      <div className="w-full">
        <div className="flex justify-center mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {selectedTab === 'all' && bookedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          {selectedTab === 'ongoing' && bookedServices.filter((s) => s.status !== 'completed').map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          {selectedTab === 'completed' && bookedServices.filter((s) => s.status === 'completed').map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}