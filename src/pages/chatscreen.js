import React, { useState, useEffect } from 'react';

const ChatScreen = ({ customerId, vendorId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Load chat history when the component loads
    fetch(`/chat/history/${customerId}/${vendorId}`)
      .then((response) => response.json())
      .then((data) => setMessages(data.chat.messages));
  }, [customerId, vendorId]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return; // Avoid sending empty messages

    const message = {
      customerId,
      vendorId,
      message: newMessage,
      sender: 'customer',
    };

    fetch('/chat/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }).then(() => {
      setMessages([...messages, { sender: 'customer', message: newMessage }]);
      setNewMessage('');
    });
  };

  // Function to handle the "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-between">
      {/* Chat Header */}
      <div className="bg-indigo-600 text-white p-4 text-lg font-semibold">
        Chat with Vendor
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2 ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-2 rounded-lg ${
                msg.sender === 'customer'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              <p>{msg.message}</p>
             
            </div>
            <div className='rounded-full h-8'> </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white flex items-center border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Trigger sendMessage on "Enter"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
