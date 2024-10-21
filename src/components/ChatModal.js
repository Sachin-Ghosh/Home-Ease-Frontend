import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, MapPin, Send, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ChatModal = ({ isOpen, onClose, bookingId, vendorId, customerId }) => {
  const { token, authUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const messagesEndRef = useRef(null);
  const ws = useRef(null);

  console.log(currentUserRole)

  useEffect(() => {
    if (isOpen && authUser) {
      initializeChat();
      determineUserRole();
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [isOpen, authUser]);

  const determineUserRole = async () => {
    try {
      // Fetch vendor info
      const vendorResponse = await fetch(`${process.env.API_URL}api/vendors/vendor/user/${authUser._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (vendorResponse.ok) {
        const vendorData = await vendorResponse.json();
        if (vendorData._id === vendorId) {
          setCurrentUserRole('vendor');
          console.log('vendor')
          return;
        }
      }

      // If not a vendor, check if customer
      const customerResponse = await fetch(`${process.env.API_URL}api/customers/customer/user/${authUser._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        if (customerData._id === customerId) {
          setCurrentUserRole('customer');
          console.log('customer')
          return;
        }
      }

      // If neither vendor nor customer, set as undefined
      console.log('error')
      setCurrentUserRole(undefined);
    } catch (error) {
      console.error('Error determining user role:', error);
      setError('Failed to determine user role');
    }
  };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

  const connectWebSocket = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.close();
    }

    ws.current = new WebSocket(`${process.env.WS_URL}`);
    
    ws.current.onopen = () => {
      // Send authentication and chat subscription message
      ws.current.send(JSON.stringify({
        type: 'subscribe',
        chatId: chatId,
        token: token
      }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.chatId === chatId) {
        setMessages(prev => [...prev, data.message]);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Connection error. Messages may not be real-time.');
    };

    ws.current.onclose = () => {
      // Attempt to reconnect after a delay
      setTimeout(() => {
        if (isOpen) {
          connectWebSocket();
        }
      }, 3000);
    };
  };

  const initializeChat = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.API_URL}api/chats/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bookingId,
          customerId,
          vendorId
        })
      });

      if (!response.ok) throw new Error('Failed to initialize chat');
      
      const data = await response.json();
      setChatId(data._id);
      setMessages(data.messages || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedImage) return;

    try {
      let imageUrl = null;
      if (selectedImage) {
        setIsImageUploading(true);
        const formData = new FormData();
        formData.append('image', selectedImage);
        
        const uploadResponse = await fetch(`${process.env.API_URL}api/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        
        if (!uploadResponse.ok) throw new Error('Failed to upload image');
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
        setIsImageUploading(false);
      }

      const messageData = {
        sender: authUser._id,
        message: newMessage.trim(),
        imageUrl
      };

      // Optimistically add the message to the UI
      const newMessageObj = {
        ...messageData,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMessageObj]);

      const response = await fetch(`${process.env.API_URL}api/chats/${chatId}/message`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(messageData)
      });

      if (!response.ok) {
        // If the message fails to send, remove it from the UI
        setMessages(prev => prev.filter(msg => msg !== newMessageObj));
        throw new Error('Failed to send message');
      }

      setNewMessage('');
      setSelectedImage(null);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleShareLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const location = {
        type: 'Point',
        coordinates: [position.coords.longitude, position.coords.latitude]
      };

      const messageData = {
        sender: customerId,
        message: 'Shared current location',
        location
      };

      const response = await fetch(`${process.env.API_URL}api/chats/${chatId}/message`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(messageData)
      });

      if (!response.ok) throw new Error('Failed to share location');

    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    }
  };


  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Chat with {currentUserRole === 'vendor' ? 'Customer' : 'Service Provider'}</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="m-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            messages.map((msg, index) => {
              const isCurrentUser = msg.sender === authUser._id;
              return (
                <div
                  key={index}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`flex items-center gap-2 text-xs text-gray-500 mb-1`}
                    >
                      <span className={`${isCurrentUser ? 'order-1' : 'order-2'}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                      <span 
                        className={`px-1.5 py-0.5 rounded text-white ${
                          isCurrentUser 
                            ? 'bg-blue-500 order-2' 
                            : 'bg-gray-500 order-1'
                        }`}
                      >
                        {isCurrentUser ? (currentUserRole === 'vendor' ? 'V' : 'C') : (currentUserRole === 'vendor' ? 'C' : 'V')}
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        isCurrentUser
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {msg.imageUrl && (
                        <img
                          src={msg.imageUrl}
                          alt="Shared image"
                          className="max-w-full rounded-lg mb-2"
                        />
                      )}
                      {msg.location && (
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <a
                            href={`https://www.google.com/maps?q=${msg.location.coordinates[1]},${msg.location.coordinates[0]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            View Location
                          </a>
                        </div>
                      )}
                      {msg.message}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {selectedImage && (
          <div className="px-4 py-2 border-t flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded">
              <ImageIcon className="h-4 w-4" />
              <span className="text-sm truncate">{selectedImage.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={handleImageSelect}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => document.getElementById('image-upload').click()}
              disabled={isImageUploading}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShareLocation}
            >
              <MapPin className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isImageUploading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={(!newMessage.trim() && !selectedImage) || isImageUploading}
            >
              {isImageUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;