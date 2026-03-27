'use client';

import React, { useState } from 'react';
import { Search, Send, Check, CheckCheck, MoreVertical, Paperclip, Phone, Video, ChevronLeft, MessageSquare } from 'lucide-react';
import { MOCK_USERS, MOCK_LISTINGS } from '@/lib/mock-data';
import Link from 'next/link';

export default function GuestInboxPage() {
  const [activeChat, setActiveChat] = useState<string | null>(MOCK_USERS[1].id); // Default to Bob Smith (Host)
  const [message, setMessage] = useState('');
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);

  const mockConversations = [
    {
      id: MOCK_USERS[1].id,
      name: MOCK_USERS[1].name,
      avatar: MOCK_USERS[1].avatar,
      lastMessage: "Looking forward to your stay at the Modern Loft!",
      time: "10:30 AM",
      unread: 0,
      online: true,
      listing: MOCK_LISTINGS[1].title
    },
    {
      id: MOCK_USERS[2].id,
      name: MOCK_USERS[2].name,
      avatar: MOCK_USERS[2].avatar,
      lastMessage: "Your identification has been verified.",
      time: "Yesterday",
      unread: 2,
      online: false,
      listing: "System Support"
    }
  ];

  const currentChatUser = MOCK_USERS.find(u => u.id === activeChat);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'host', text: "Hello! Thank you for booking the Modern Loft.", time: "09:45 AM" },
    { id: 2, sender: 'guest', text: "Hi Bob! I'm excited. What's the check-in procedure?", time: "09:50 AM" },
    { id: 3, sender: 'host', text: "I'll send you the smart lock PIN 24 hours before your arrival. Is that okay?", time: "10:15 AM" },
    { id: 4, sender: 'guest', text: "Perfect, thanks!", time: "10:20 AM" },
    { id: 5, sender: 'host', text: "Looking forward to your stay at the Modern Loft!", time: "10:30 AM" },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: 'guest',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setMessage('');
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--background)]">
      
      
      <main className="flex-1 flex overflow-hidden max-w-[1600px] mx-auto w-full">
        {/* Conversations Sidebar */}
        <aside className={`${isMobileListVisible ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[380px] border-r border-[var(--border)] bg-[var(--card)] z-20`}>
          <div className="p-6">
            <h1 className="text-2xl font-black text-[var(--foreground)] mb-6">Messages</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
              <input 
                type="text" 
                placeholder="Search messages..."
                className="w-full bg-[var(--background)] border-none rounded-2xl py-3.5 pl-12 pr-4 font-medium text-sm focus:ring-2 focus:ring-[oklch(0.4_0.155_11.87)] transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 space-y-1">
            {mockConversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setActiveChat(chat.id);
                  setIsMobileListVisible(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                  activeChat === chat.id ? 'bg-[oklch(0.4_0.155_11.87/0.1)]' : 'hover:bg-[oklch(0.4_0.155_11.87/0.04)]'
                }`}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-full object-cover border-2 border-[var(--card)] shadow-sm" />
                  {chat.online && <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-[var(--card)]" />}
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-[var(--foreground)] truncate">{chat.name}</h3>
                    <span className="text-[10px] font-bold text-[var(--muted-foreground)]">{chat.time}</span>
                  </div>
                  <p className="text-xs font-semibold text-[oklch(0.4_0.155_11.87)] mb-0.5 truncate">{chat.listing}</p>
                  <p className="text-xs font-medium text-[var(--muted-foreground)] truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-6 h-6 rounded-full bg-[oklch(0.4_0.155_11.87)] text-white text-[10px] font-black flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <section className={`${!isMobileListVisible ? 'flex' : 'hidden'} md:flex flex-col flex-1 bg-[var(--background)] relative`}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <header className="h-20 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsMobileListVisible(true)} className="md:hidden p-2 rounded-xl hover:bg-black/5">
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex items-center gap-3">
                    <img src={currentChatUser?.avatar} alt={currentChatUser?.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h2 className="font-bold text-[var(--foreground)] leading-tight">{currentChatUser?.name}</h2>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl hover:bg-[oklch(0.4_0.155_11.87/0.1)] text-[var(--muted-foreground)] transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </header>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex justify-center mb-8">
                  <span className="bg-[var(--border)] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full text-[var(--muted-foreground)]">
                    April 15, 2024
                  </span>
                </div>

                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'guest' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] space-y-1 ${msg.sender === 'guest' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-5 py-3.5 rounded-3xl font-medium text-sm shadow-sm ${
                        msg.sender === 'guest' 
                          ? 'bg-[oklch(0.4_0.155_11.87)] text-white rounded-br-none' 
                          : 'bg-[var(--card)] text-[var(--foreground)] rounded-bl-none border border-[var(--border)]'
                      }`}>
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1.5 px-2">
                        <span className="text-[10px] font-bold text-[var(--muted-foreground)]">{msg.time}</span>
                        {msg.sender === 'guest' && <CheckCheck size={12} className="text-[oklch(0.4_0.155_11.87)]" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <footer className="p-6 bg-[var(--card)] border-t border-[var(--border)]">
                <div className="flex items-center gap-3 bg-[var(--background)] p-2 rounded-2xl border-2 border-transparent focus-within:border-[oklch(0.4_0.155_11.87)] transition-all">
                  <button className="p-2.5 rounded-xl hover:bg-[var(--card)] text-[var(--muted-foreground)] transition-all">
                    <Paperclip size={20} />
                  </button>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent border-none focus:ring-0 font-medium text-sm"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="w-12 h-12 rounded-xl bg-[oklch(0.4_0.155_11.87)] text-white flex items-center justify-center shadow-lg shadow-[oklch(0.4_0.155_11.87/0.3)] hover:scale-105 active:scale-95 disabled:grayscale disabled:opacity-50 transition-all"
                  >
                    <Send size={18} fill="currentColor" />
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 bg-[var(--muted)] rounded-[32px] flex items-center justify-center text-[var(--muted-foreground)] mb-8">
                <MessageSquare size={40} />
              </div>
              <h2 className="text-2xl font-black text-[var(--foreground)] mb-3">Your Inbox</h2>
              <p className="text-[var(--muted-foreground)] font-medium max-w-xs leading-relaxed">
                Connect with hosts, ask questions, and finalize your travel plans all in one place.
              </p>
            </div>
          )}
        </section>
      </main>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--muted-foreground); }
      `}</style>
    </div>
  );
}
