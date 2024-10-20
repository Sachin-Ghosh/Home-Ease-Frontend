import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MapPin, MessageCircle, Clock, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/context/AuthContext';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

export default function BookedServices() {
  const router = useRouter();
  const { token, authUser } = useAuth();
  const [bookedServices, setBookedServices] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');
  const [vendorNames, setVendorNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      if (!authUser) return;
      try {
        const baseUrl = process.env.API_URL.endsWith('/') 
          ? process.env.API_URL.slice(0, -1) 
          : process.env.API_URL;
        const response = await fetch(`${baseUrl}/api/customers/customer/user/${authUser._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        console.log("Customer info API response:", data);
        return data._id;
      } catch (error) {
        console.error('Error fetching customer info:', error);
        return null;
      }
    };

    const fetchBookings = async (customerId) => {
      try {
        const baseUrl = process.env.API_URL.endsWith('/') 
          ? process.env.API_URL.slice(0, -1) 
          : process.env.API_URL;
        const response = await fetch(`${baseUrl}/api/bookings/customer/${customerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
    
        const data = await response.json();
        console.log("Fetched bookings data:", data);
        setBookedServices(data);

        // Set the selected tab based on the statuses of the bookings
        const hasCompleted = data.some(booking => booking.status === 'Completed');
        const hasOngoing = data.some(booking => booking.status !== 'Completed');
        
        if (hasCompleted && hasOngoing) {
          setSelectedTab('all');
        } else if (hasCompleted) {
          setSelectedTab('completed');
        } else if (hasOngoing) {
          setSelectedTab('ongoing');
        } else {
          setSelectedTab('all');
        }
    
        // Fetch vendor info for each booking
        const vendors = {};
        for (const service of data) {
          const vendorName = await fetchVendorInfo(service.vendor.userId);
          vendors[service.vendor.userId] = vendorName;
        }
        setVendorNames(vendors);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchData = async () => {
      const customerId = await fetchCustomerInfo();
      if (customerId) {
        await fetchBookings(customerId);
      }
    };

    fetchData();
  }, [authUser, token]);

  const fetchVendorInfo = async (vendorUserId) => {
    try {
      const baseUrl = process.env.API_URL.endsWith('/') 
        ? process.env.API_URL.slice(0, -1) 
        : process.env.API_URL;
      const response = await fetch(`${baseUrl}/api/vendors/vendor/user/${vendorUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch vendor info');
      const data = await response.json();
      return data.userId.name;
    } catch (error) {
      console.error('Error fetching vendor info:', error);
      return 'N/A';
    }
  };

  const handleTabChange = (value) => {
    setSelectedTab(value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const ServiceCard = ({ service, vendorName }) => {
    // Determine the card color based on the service status
    const cardColor = service.status === 'Completed'
      ? 'bg-green-100'
      : service.status === 'Cancelled'
      ? 'bg-red-100'
      : 'bg-blue-100'; // For 'Scheduled' or other statuses
  
    return (
      <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ${cardColor}`}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {service.service[0].name}
          </CardTitle>
          <CardDescription className="text-gray-600">
            Start: {formatDate(service.slot.startTime)}
            <br />
            End: {formatDate(service.slot.endTime)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Vendor: {vendorName}</p>
          <p className="text-gray-700">Payment Type: {service.payment_type}</p>
          <p className="text-gray-700">Payment Status: {service.payment_status}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge variant={service.status === 'Completed' ? 'secondary' : 'default'}>
            {service.status}
          </Badge>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <ServiceDetailsModal service={service} />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    );  
  };
  

  const ServiceDetailsModal = ({ service, userId }) => (
    <>
      <DialogHeader className='bg-white'>
        <DialogTitle>{service.service[0].name}</DialogTitle>
        <DialogDescription>Service details</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 bg-white">
        <div>
          <h4 className="font-semibold mb-2">Booking Info</h4>
          <p>Start Time: {formatDate(service.slot.startTime)}</p>
          <p>End Time: {formatDate(service.slot.endTime)}</p>
          <p>Vendor: {service.vendor.userId.name || 'N/A'}</p>
          <p>Payment Type: {service.payment_type}</p>
          <p>Payment Status: {service.payment_status}</p>
          <p>Booking Status: {service.status}</p>
        </div>
        <ChatModal bookingId={service._id} userId={userId} />
      </div>
    </>
  );

  const initialMessages = [
    { id: 1, sender: 'provider', content: "Hello! How can I assist you today?", timestamp: "10:00 AM" },
    { id: 2, sender: 'user', content: "Hi, I need help with plumbing. My kitchen sink is leaking.", timestamp: "10:02 AM" },
    { id: 3, sender: 'provider', content: "I'm sorry to hear that. Can you provide more details about the leak?", timestamp: "10:03 AM" },
    { id: 4, sender: 'user', content: "It's dripping from the pipe under the sink. The cabinet below is getting wet.", timestamp: "10:05 AM" },
    { id: 5, sender: 'provider', content: "I see. It sounds like you might have a loose connection or a worn-out washer. I can come take a look. When would be a good time?", timestamp: "10:07 AM" },
  ];

  function ChatModal({ bookingId, userId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatId, setChatId] = useState(null);

    useEffect(() => {
      fetchChat();
    }, [bookingId]);

    const fetchChat = async () => {
      try {
        const baseUrl = process.env.API_URL.endsWith('/') 
          ? process.env.API_URL.slice(0, -1) 
          : process.env.API_URL;
        const response = await fetch(`${baseUrl}/api/chat/booking/${bookingId}`);
        if (!response.ok) {
          throw new Error('Chat not found');
        }
        const data = await response.json();
        console.log('Fetched chat data:', data);
        setMessages(data.messages);
        setChatId(data._id);
        console.log('Set chatId to:', data._id);
      } catch (error) {
        console.error('Error fetching chat:', error);
        if (error.message === 'Chat not found') {
          createNewChat();
        }
      }
    };

    const createNewChat = async () => {
      try {
        const url = `${process.env.API_URL}api/chat`;
        console.log('Attempting to create new chat at URL:', url);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Server response:', errorData);
          throw new Error(errorData.message || 'Failed to create chat');
        }
        const data = await response.json();
        console.log('Created new chat:', data);
        setChatId(data._id);
        setMessages(data.messages || []);
        console.log('Set chatId to:', data._id);
      } catch (error) {
        console.error('Error creating chat:', error);
        // Show error message to user
      }
    };

    const handleSendMessage = async () => {
      if (!chatId) {
        console.error('Chat ID is not available. Unable to send message.');
        // Show error message to user
        return;
      }
      
      if (newMessage.trim() !== '') {
        try {
          const response = await fetch(`${process.env.API_URL}api/chat/${chatId}/message`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              sender: userId,
              message: newMessage.trim(),
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Server response:', errorData);
            throw new Error(errorData.message || 'Failed to send message');
          }
          
          const data = await response.json();
          setMessages(data.messages);
          setNewMessage('');
        } catch (error) {
          console.error('Error sending message:', error);
          // Show error message to user
        }
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            <MessageCircle className="mr-2" size={20} />
            Chat with Vendor
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Chat with Service Provider</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-[500px]">
            <ScrollArea className="flex-grow p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${message.sender === userId ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === userId ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.sender === userId ? "/placeholder-user.jpg" : "/placeholder-provider.jpg"} />
                      <AvatarFallback>{message.sender === userId ? 'U' : 'SP'}</AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg p-3 ${message.sender === userId ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-sm">{message.message}</p>
                      <span className="text-xs opacity-50">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 border-t">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">My Booked Services</h1>
      <div className="w-full">
        <div className="flex justify-center mb-6">
          <button onClick={() => handleTabChange('all')} className={`px-4 py-2 ${selectedTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
          <button onClick={() => handleTabChange('ongoing')} className={`px-4 py-2 ${selectedTab === 'ongoing' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Ongoing</button>
          <button onClick={() => handleTabChange('completed')} className={`px-4 py-2 ${selectedTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Completed</button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookedServices
          .filter(service =>
            selectedTab === 'all' ||
            (selectedTab === 'ongoing' && service.status !== 'Completed') ||
            (selectedTab === 'completed' && service.status === 'Completed')
          )
          .map((service) => (
            <ServiceCard key={service._id} service={service} vendorName={vendorNames[service.vendor.userId] || 'N/A'} />
          ))}
        </div>
      </div>
    </div>
  );
}
