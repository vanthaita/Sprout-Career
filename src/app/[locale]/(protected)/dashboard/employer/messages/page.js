'use client'
import React from 'react';
import { MessageCircle, Search, Send, Paperclip, Smile, ChevronLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const MessagePage = () => {
  const primaryColor = '#3A6B4C';
  const [activeConversation, setActiveConversation] = useState(null);
  
  const conversations = [
    {
      id: 1,
      recruiter: {
        name: "Talent Acquisition Team",
        avatar: "/avatars/recruiter-01.png",
        company: "TechCorp Inc."
      },
      lastMessage: "We'd like to schedule an interview for next week",
      time: "10:30 AM",
      unread: 2
    },
    {
      id: 2,
      recruiter: {
        name: "Sarah Johnson",
        avatar: "/avatars/recruiter-02.png",
        company: "Innovate Solutions"
      },
      lastMessage: "Your application has been shortlisted!",
      time: "Yesterday",
      unread: 0
    },
    {
      id: 3,
      recruiter: {
        name: "Michael Brown",
        avatar: "/avatars/recruiter-03.png",
        company: "Digital Ventures"
      },
      lastMessage: "Please send your availability for a call",
      time: "Mon",
      unread: 1
    }
  ];

  const messages = [
    { id: 1, sender: "recruiter", content: "Hello Alex, we're impressed with your application!", time: "10:00 AM" },
    { id: 2, sender: "recruiter", content: "Would you be available for an interview next Tuesday?", time: "10:02 AM" },
    { id: 3, sender: "me", content: "Thank you! Tuesday works for me.", time: "10:30 AM" },
    { id: 4, sender: "me", content: "What time would be convenient?", time: "10:31 AM" },
    { id: 5, sender: "recruiter", content: "How about 2 PM? We'll send a Zoom link.", time: "11:15 AM" }
  ];

  return (
    <div className="flex h-screen bg-white">
      <div className={`w-full ${activeConversation ? 'hidden' : 'block'}`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Messages</h2>
            <Badge className="bg-gray-100 text-gray-800">3</Badge>
          </div>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-120px)]">
          {conversations.map((convo) => (
            <div 
              key={convo.id}
              className={`flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer ${activeConversation?.id === convo.id ? 'bg-gray-50' : ''}`}
              onClick={() => setActiveConversation(convo)}
            >
              <Avatar className="mr-3">
                <AvatarImage src={convo.recruiter.avatar} />
                <AvatarFallback>{convo.recruiter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-medium truncate">{convo.recruiter.name}</h3>
                  <span className="text-xs text-gray-500">{convo.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{convo.recruiter.company}</p>
                <p className="text-sm text-gray-700 truncate">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <Badge className="ml-2" style={{ backgroundColor: primaryColor }}>
                  {convo.unread}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={`${activeConversation ? 'block' : 'hidden'} w-full h-full `}
      >
      {activeConversation ? (
        <div className={`flex-1 flex flex-col h-full`}>
          <div className="p-4 border-b flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => setActiveConversation(null)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Avatar className="mr-3">
              <AvatarImage src={activeConversation.recruiter.avatar} />
              <AvatarFallback>{activeConversation.recruiter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{activeConversation.recruiter.name}</h3>
              <p className="text-sm text-gray-500">{activeConversation.recruiter.company}</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === 'me' ? 'bg-[#3A6B4C] text-white rounded-tr-none' : 'bg-gray-100 rounded-tl-none'}`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-white/70' : 'text-gray-500'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button size="icon" style={{ backgroundColor: primaryColor }}>
                <Send className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50">
          <div className="text-center p-6">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Select a conversation</h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose a message from the list to start chatting
            </p>
          </div>
        </div>
      )}
    </div>
      </div>
  );
};

export default MessagePage;