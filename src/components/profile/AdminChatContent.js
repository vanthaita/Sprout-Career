import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AdminChatContent = (/* { initialMessages = [], onSendMessage } */) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollAreaRef = useRef(null);

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return; 

        console.log("Sending message:", newMessage);
       
        const messageToSend = {
             id: Date.now(),
             sender: 'user',
             text: newMessage,
             timestamp: new Date()
        };
        setMessages(prev => [...prev, messageToSend]);
        setNewMessage('');
    };

   
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if (scrollViewport) {
                setTimeout(() => {
                     scrollViewport.scrollTop = scrollViewport.scrollHeight;
                }, 0);
            }
        }
    }, [messages]); 


    const MAX_LENGTH = 500;

    return (
        <Card className="shadow-none border-0 md:border md:shadow-sm">
            <CardContent className="p-4 md:p-6 flex flex-col gap-4">
                 <ScrollArea className="h-96 w-full rounded-md border p-4" ref={scrollAreaRef}>
                     {messages.length === 0 ? (
                         <p className="text-sm text-muted-foreground">コメントがありません</p>
                     ) : (
                         <div className="space-y-4">
                             {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                     <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                         {msg.text}
                                     </div>
                                </div>
                             ))}
                         </div>
                     )}
                </ScrollArea>

                <div className="space-y-2">
                    <Textarea
                        placeholder="コメントを入力してください"
                        value={newMessage}
                        onChange={handleInputChange}
                        className="min-h-[80px] resize-none" 
                        maxLength={MAX_LENGTH} 
                    />
                    <div className="flex justify-between items-center">
                         <span className="text-xs text-muted-foreground">
                             {newMessage.length} / {MAX_LENGTH}
                         </span>
                         <Button
                            className="bg-transparent text-[#3A6B4C] cursor-pointer" 
                            size="sm"
                            onClick={handleSendMessage}
                            disabled={newMessage.trim() === ''} 
                         >
                            送信
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};