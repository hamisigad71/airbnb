'use client';

import React, { useState } from 'react';
import { Search, Send, CheckCheck, MoreVertical, Paperclip, Phone, Video, ChevronLeft, Calendar, User, Info } from 'lucide-react';
import { MOCK_USERS, MOCK_LISTINGS, MOCK_BOOKINGS } from '@/lib/mock-data';
import Link from 'next/link';

export default function HostInboxPage() {
  const [activeChat, setActiveChat] = useState<string | null>(MOCK_USERS[0].id); // Default to Alice Johnson (Guest)
  const [message, setMessage] = useState('');
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);

  const mockConversations = [
    {
      id: MOCK_USERS[0].id,
      name: MOCK_USERS[0].name,
      avatar: MOCK_USERS[0].avatar,
      lastMessage: "Perfect, thanks!",
      time: "10:20 AM",
      unread: 0,
      online: true,
      bookingStatus: "Upcoming • April 15-20",
      listing: MOCK_LISTINGS[1].title
    }
  ];

  const currentChatUser = MOCK_USERS.find(u => u.id === activeChat);
  const currentBooking = MOCK_BOOKINGS.find(b => b.guestId === activeChat);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'host', text: "Hello! Thank you for booking the Modern Loft.", time: "09:45 AM" },
    { id: 2, sender: 'guest', text: "Hi Bob! I'm excited. What's the check-in procedure?", time: "09:50 AM" },
    { id: 3, sender: 'host', text: "I'll send you the smart lock PIN 24 hours before your arrival. Is that okay?", time: "10:15 AM" },
    { id: 4, sender: 'guest', text: "Perfect, thanks!", time: "10:20 AM" },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: 'host',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setMessage('');
  };

  return (
    <div className="h-screen flex flex-col bg-[oklch(0.99_0.001_0)]">
      {/* Mini Host Header */}
      <header className="h-16 px-6 bg-[oklch(0.1_0.001_0)] text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/host" className="font-black text-xl hover:opacity-80 transition-opacity">StayLux Host</Link>
          <div className="h-6 w-[1px] bg-white/20 mx-2" />
          <nav className="flex gap-4 text-xs font-bold uppercase tracking-widest text-white/60">
            <Link href="/host" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/host/listings" className="hover:text-white transition-colors">Listings</Link>
            <Link href="/host/bookings" className="hover:text-white transition-colors">Bookings</Link>
            <Link href="/host/messages" className="text-white">Inbox</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">BS</div>
        </div>
      </header>
      
      <main className="flex-1 flex overflow-hidden">
        {/* Conversations Sidebar */}
        <aside className={`${isMobileListVisible ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[400px] border-r border-[oklch(0.92_0.002_0)] bg-white`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black text-[oklch(0.1_0.001_0)]">Inbox</h1>
              <span className="bg-[oklch(0.95_0.03_11.87)] text-[oklch(0.4_0.155_11.87)] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Hosting
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[oklch(0.55_0.005_0)]" size={18} />
              <input 
                type="text" 
                placeholder="Search guest or listing..."
                className="w-full bg-[oklch(0.96_0.002_0)] border-none rounded-2xl py-3.5 pl-12 pr-4 font-medium text-sm focus:ring-0"
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
                  activeChat === chat.id ? 'bg-[oklch(0.95_0.03_11.87)] border border-white shadow-sm' : 'hover:bg-[oklch(0.98_0.001_0)]'
                }`}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-full object-cover border-2 border-white" />
                  {chat.online && <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />}
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-[oklch(0.1_0.001_0)] truncate">{chat.name}</h3>
                    <span className="text-[10px] font-bold text-[oklch(0.55_0.005_0)]">{chat.time}</span>
                  </div>
                  <p className="text-[11px] font-bold text-[oklch(0.4_0.155_11.87)] mb-0.5 truncate uppercase tracking-tighter">{chat.listing}</p>
                  <p className="text-xs font-semibold text-[oklch(0.55_0.005_0)] truncate">{chat.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <section className={`${!isMobileListVisible ? 'flex' : 'hidden'} md:flex flex-col flex-1 bg-[oklch(0.99_0.001_0)]`}>
          {activeChat ? (
            <div className="flex h-full">
              <div className="flex-1 flex flex-col min-w-0">
                {/* Chat Header */}
                <header className="h-20 border-b border-[oklch(0.92_0.002_0)] bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setIsMobileListVisible(true)} className="md:hidden p-2 rounded-xl hover:bg-black/5">
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                      <img src={currentChatUser?.avatar} alt={currentChatUser?.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h2 className="font-bold text-[oklch(0.1_0.001_0)] leading-tight">{currentChatUser?.name}</h2>
                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Verified Guest</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2.5 rounded-xl hover:bg-[oklch(0.96_0.002_0)] text-[oklch(0.55_0.005_0)] transition-colors">
                      <Phone size={20} />
                    </button>
                    <button className="p-2.5 rounded-xl hover:bg-[oklch(0.96_0.002_0)] text-[oklch(0.55_0.005_0)] transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </header>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'host' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] space-y-1 ${msg.sender === 'host' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-5 py-3.5 rounded-2xl font-medium text-sm shadow-sm ${
                          msg.sender === 'host' 
                            ? 'bg-[oklch(0.1_0.001_0)] text-white' 
                            : 'bg-white text-[oklch(0.1_0.001_0)] border border-[oklch(0.95_0.002_0)]'
                        }`}>
                          {msg.text}
                        </div>
                        <div className="flex items-center gap-1.5 px-2">
                          <span className="text-[10px] font-bold text-[oklch(0.55_0.005_0)]">{msg.time}</span>
                          {msg.sender === 'host' && <CheckCheck size={12} className="text-blue-500" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <footer className="p-6 bg-white border-t border-[oklch(0.92_0.002_0)]">
                  <div className="flex items-center gap-3 bg-[oklch(0.96_0.002_0)] p-2 rounded-2xl border-2 border-transparent focus-within:border-[oklch(0.1_0.001_0)] transition-all">
                    <button className="p-2.5 rounded-xl hover:bg-white text-[oklch(0.55_0.005_0)]">
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
                      className="w-12 h-12 rounded-xl bg-[oklch(0.1_0.001_0)] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all font-black text-xs uppercase"
                    >
                      SEND
                    </button>
                  </div>
                </footer>
              </div>

              {/* Context Sidebar (Desktop Only) */}
              <aside className="hidden lg:flex w-[320px] border-l border-[oklch(0.92_0.002_0)] bg-white flex-col p-8">
                <div className="flex flex-col items-center text-center mb-10">
                  <img src={currentChatUser?.avatar} alt={currentChatUser?.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[oklch(0.96_0.002_0)] shadow-sm" />
                  <h3 className="font-bold text-xl mb-1">{currentChatUser?.name}</h3>
                  <p className="text-xs font-bold text-[oklch(0.55_0.005_0)] uppercase tracking-widest">Guest since 2024</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-[oklch(0.98_0.001_0)] p-6 rounded-3xl border border-[oklch(0.95_0.002_0)]">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-[oklch(0.55_0.005_0)] mb-4">Trip Details</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Calendar size={18} className="text-[oklch(0.4_0.155_11.87)]" />
                        <div>
                          <p className="text-xs font-bold">{currentBooking?.checkIn} - {currentBooking?.checkOut}</p>
                          <p className="text-[10px] font-medium text-[oklch(0.55_0.005_0)]">5 nights</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <User size={18} className="text-[oklch(0.4_0.155_11.87)]" />
                        <div>
                          <p className="text-xs font-bold">{currentBooking?.guests} Guests</p>
                          <p className="text-[10px] font-medium text-[oklch(0.55_0.005_0)]">Primary booking</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full py-4 rounded-2xl border-2 border-[oklch(0.9_0.002_0)] font-bold text-sm hover:bg-[oklch(0.96_0.002_0)] transition-colors flex items-center justify-center gap-3">
                      <Info size={16} />
                      View Profile
                    </button>
                    <button className="w-full py-4 rounded-2xl bg-[oklch(0.95_0.03_11.87)] text-[oklch(0.4_0.155_11.87)] font-bold text-sm hover:scale-[1.02] transition-transform">
                      Send Special Offer
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[oklch(0.55_0.005_0)] font-bold">
              Select a conversation to start chatting
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
