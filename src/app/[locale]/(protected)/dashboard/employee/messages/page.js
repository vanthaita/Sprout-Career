import { Search, MoreVertical, Paperclip, Mic, Smile, Send, ChevronLeft, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessagePage = () => {
  const primaryColor = '#3A6B4C';
  const secondaryColor = '#E8F5E9';

  // Sample data
  const conversations = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/avatars/01.png",
      lastMessage: "Thanks for the update!",
      time: "10:30 AM",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "/avatars/02.png",
      lastMessage: "Can we schedule an interview?",
      time: "Yesterday",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "/avatars/03.png",
      lastMessage: "I've sent the documents",
      time: "Mon",
      unread: 0,
      online: true
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar: "/avatars/04.png",
      lastMessage: "Let me know your thoughts",
      time: "6/12/23",
      unread: 1,
      online: false
    }
  ];

  const messages = [
    { id: 1, sender: "them", content: "Hi there! How are you?", time: "10:00 AM" },
    { id: 2, sender: "them", content: "I wanted to follow up on our conversation", time: "10:02 AM" },
    { id: 3, sender: "me", content: "I'm doing well, thanks for asking!", time: "10:05 AM" },
    { id: 4, sender: "me", content: "What specifically did you want to discuss?", time: "10:06 AM" },
    { id: 5, sender: "them", content: "About the job opportunity we talked about last week", time: "10:10 AM" },
    { id: 6, sender: "me", content: "Ah yes, I'm still very interested!", time: "10:12 AM" },
    { id: 7, sender: "them", content: "Great! Can we schedule an interview?", time: "10:15 AM" }
  ];

  const activeConversation = conversations[0];

  return (
    <div className="flex h-screen bg-white">
      {/* Conversation List */}
      <div className="w-full md:w-96 border-r">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Messages</h2>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          {conversations.map((convo) => (
            <div 
              key={convo.id}
              className={`flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer ${activeConversation.id === convo.id ? 'bg-[#E8F5E9]' : ''}`}
            >
              <div className="relative mr-3">
                <Avatar>
                  <AvatarImage src={convo.avatar} />
                  <AvatarFallback>{convo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {convo.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-medium truncate">{convo.name}</h3>
                  <span className="text-xs text-muted-foreground">{convo.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <Badge className="ml-2" style={{ backgroundColor: primaryColor }}>
                  {convo.unread}
                </Badge>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-col flex-1">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="relative mr-3">
              <Avatar>
                <AvatarImage src={activeConversation.avatar} />
                <AvatarFallback>{activeConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {activeConversation.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500"></div>
              )}
            </div>
            <div>
              <h3 className="font-medium">{activeConversation.name}</h3>
              <p className="text-xs text-muted-foreground">
                {activeConversation.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === 'me' ? 'rounded-tr-none' : 'rounded-tl-none'}`}
                  style={{
                    backgroundColor: message.sender === 'me' ? primaryColor : secondaryColor,
                    color: message.sender === 'me' ? 'white' : 'inherit'
                  }}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
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
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Button size="icon" style={{ backgroundColor: primaryColor }}>
              <Send className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Empty State for Mobile */}
      <div className="md:hidden flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
            <MessageCircle className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Select a conversation</h3>
          <p className="mt-1 text-sm text-gray-500">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;