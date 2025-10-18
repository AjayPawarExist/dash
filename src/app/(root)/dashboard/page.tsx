'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings, 
  BarChart3, 
  FileText,
  Star,
  Search,
  Smile,
  Paperclip,
  Send,
  Phone,
  Mail,
  MapPin,
  Activity,
  CreditCard,
  Sparkles,
  MoreVertical,
  Video,
  Info,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  Mic,
  Image,
  FileIcon,
  Contact,
  Calendar,
  Music,
  X,
  Plus
} from 'lucide-react'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  id: number
  text: string
  sender: 'user' | 'admin'
  time: string
  grouped?: boolean
  status?: 'sent' | 'delivered' | 'read'
}

interface NavItem {
  icon: React.ElementType
  label: string
  submenu?: string[]
}

interface Contact {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unreadCount: number
  online: boolean
  platform: 'email' | 'chat' | 'social' | 'phone'
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('Messages')
  const [activeContact, setActiveContact] = useState(1)
  const [pinnedItems, setPinnedItems] = useState<string[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [aiInput, setAiInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', submenu: ['Overview', 'Analytics', 'Reports', 'Insights'] },
    { icon: MessageSquare, label: 'Messages', submenu: ['All Conversations', 'Unread', 'Archived', 'Starred'] },
    { icon: Users, label: 'Customers', submenu: ['All Customers', 'Active', 'New', 'VIP'] },
    { icon: FileText, label: 'Documents', submenu: ['Recent', 'Shared', 'Templates', 'Drafts'] },
    { icon: BarChart3, label: 'Analytics', submenu: ['Traffic', 'Revenue', 'Users', 'Conversion'] },
    { icon: Settings, label: 'Settings', submenu: ['Account', 'Team', 'Billing', 'Security'] },
  ]

  const contacts: Contact[] = [
    { id: 1, name: 'Rahul Sharma', avatar: 'https://github.com/shadcn.png', lastMessage: "Haan, maine try kiya lekin abhi bhi kaam nahi kar raha", time: '10:35 AM', unreadCount: 2, online: true, platform: 'chat' },
    { id: 2, name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Thank you for your help!', time: '9:15 AM', unreadCount: 0, online: true, platform: 'email' },
    { id: 3, name: 'Arjun Verma', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'Recent update ke baare mein ek sawal hai...', time: 'Yesterday', unreadCount: 5, online: false, platform: 'social' },
    { id: 4, name: 'Sneha Reddy', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Perfect, issue solve ho gaya', time: 'Yesterday', unreadCount: 0, online: false, platform: 'chat' },
    { id: 5, name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?img=4', lastMessage: 'Payment processing mein help chahiye?', time: 'Oct 16', unreadCount: 1, online: false, platform: 'phone' },
    { id: 6, name: 'Ananya Iyer', avatar: 'https://i.pravatar.cc/150?img=5', lastMessage: 'Feature ab bahut accha kaam kar raha hai!', time: 'Oct 15', unreadCount: 0, online: true, platform: 'email' },
  ]

  const messages: Message[] = [
    { id: 1, text: "Namaste, mujhe apne account ke saath help chahiye", sender: 'user', time: '10:30 AM', status: 'read' },
    { id: 2, text: "Hello! Main zaroor help karunga. Kya issue hai?", sender: 'admin', time: '10:31 AM', status: 'read' },
    { id: 3, text: "Main apna billing dashboard access nahi kar pa raha", sender: 'user', time: '10:32 AM', status: 'read' },
    { id: 4, text: "Main abhi check karta hoon aapke liye", sender: 'admin', time: '10:32 AM', status: 'read' },
    { id: 5, text: "Aap logout karke phir se login try kar sakte hain?", sender: 'admin', time: '10:33 AM', grouped: true, status: 'read' },
    { id: 6, text: "Haan, maine try kiya lekin abhi bhi kaam nahi kar raha", sender: 'user', time: '10:35 AM', status: 'delivered' },
  ]

  const currentContact = contacts.find(c => c.id === activeContact) || contacts[0]

  const getPlatformIcon = (platform: Contact['platform']) => {
    switch (platform) {
      case 'email': return Mail
      case 'chat': return MessageSquare
      case 'social': return Users
      case 'phone': return Phone
    }
  }

  const attachmentOptions = [
    { icon: Image, label: 'Photos & Videos', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { icon: FileIcon, label: 'Document', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { icon: Contact, label: 'Contact', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { icon: MapPin, label: 'Location', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
    { icon: Music, label: 'Audio', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { icon: Calendar, label: 'Schedule Meeting', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  ]

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    // Implement voice recording logic
  }

  return (
    <div className='flex h-screen bg-[#fafbfc] dark:bg-[#0d1117] overflow-hidden'>
      {/* Column 1: Icon Navigation - Minimal & Clean */}
      <div className='w-14 bg-white dark:bg-[#1c1f26] border-r border-slate-200 dark:border-slate-800 flex flex-col'>
        {/* Logo */}
        <div className='h-14 flex items-center justify-center border-b border-slate-200 dark:border-slate-800'>
          <div className='w-8 h-8 rounded-lg bg-[#5865F2] flex items-center justify-center cursor-pointer'>
            <Sparkles className='w-4 h-4 text-white' strokeWidth={2.5} />
          </div>
        </div>
        
        {/* Navigation Icons */}
        <nav className='flex-1 py-3 px-2 space-y-1'>
          {navItems.map((item) => (
            <div key={item.label} className='group relative'>
              <button
                onClick={() => setActiveNav(item.label)}
                className={`w-full h-10 flex items-center justify-center rounded-lg transition-all ${
                  activeNav === item.label
                    ? 'bg-[#5865F2] text-white'
                    : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <item.icon className='w-[18px] h-[18px]' strokeWidth={2} />
              </button>
              {/* Tooltip */}
              <div className='absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-900 text-white text-xs font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none'>
                {item.label}
              </div>
            </div>
          ))}
        </nav>

        {/* User Avatar */}
        <div className='p-2 border-t border-slate-200 dark:border-slate-800'>
          <div className='group relative'>
            <button className='w-full h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all'>
              <Avatar className='w-7 h-7'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className='text-xs font-semibold bg-[#5865F2] text-white'>AP</AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </div>

      {/* Column 2: Contacts List - Compact & Efficient */}
      <div className='w-64 bg-white dark:bg-[#1c1f26] border-r border-slate-200 dark:border-slate-800 flex flex-col'>
        {/* Header with Search */}
        <div className='h-14 px-3 flex items-center border-b border-slate-200 dark:border-slate-800'>
          <div className='relative w-full'>
            <Search className='absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400' strokeWidth={2} />
            <input
              type='text'
              placeholder='Search...'
              className='w-full h-8 pl-8 pr-2.5 bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:border-transparent transition-all'
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className='flex-1 overflow-y-auto'>
          {contacts.map((contact) => {
            const PlatformIcon = getPlatformIcon(contact.platform)
            return (
              <button
                key={contact.id}
                onClick={() => setActiveContact(contact.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 border-b border-slate-100 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/30 ${
                  activeContact === contact.id ? 'bg-slate-50 dark:bg-slate-800/50' : ''
                }`}
              >
                {/* Avatar with Online Status */}
                <div className='relative flex-shrink-0'>
                  <Avatar className='w-10 h-10'>
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className='text-xs font-semibold bg-[#5865F2] text-white'>
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#1c1f26] rounded-full'></span>
                  )}
                </div>

                {/* Contact Info */}
                <div className='flex-1 min-w-0 text-left'>
                  <div className='flex items-center justify-between mb-0.5'>
                    <h3 className='text-xs font-semibold text-slate-900 dark:text-slate-100 truncate'>
                      {contact.name}
                    </h3>
                    <span className='text-[10px] text-slate-400 dark:text-slate-500 ml-2 flex-shrink-0'>
                      {contact.time}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-[11px] text-slate-500 dark:text-slate-400 truncate pr-2 flex-1'>
                      {contact.lastMessage}
                    </p>
                    <div className='flex items-center gap-1.5 flex-shrink-0'>
                      {/* Platform Badge */}
                      <div className='w-4 h-4 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center'>
                        <PlatformIcon className='w-2 h-2 text-slate-500 dark:text-slate-400' strokeWidth={2.5} />
                      </div>
                      {/* Unread Count */}
                      {contact.unreadCount > 0 && (
                        <div className='min-w-[16px] h-[16px] px-1 bg-[#5865F2] rounded-full flex items-center justify-center'>
                          <span className='text-[9px] font-bold text-white'>
                            {contact.unreadCount > 9 ? '9+' : contact.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Column 3: Chat Section - Professional & Compact */}
      <div className='flex-1 flex flex-col bg-white dark:bg-[#1c1f26] min-w-0'>
        {/* User Info Bar - Consistent with Columns */}
        <div className='h-14 flex items-center justify-between px-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f26]'>
          <div className='flex items-center gap-2.5'>
            <div className='relative'>
              <Avatar className='w-9 h-9'>
                <AvatarImage src={currentContact.avatar} />
                <AvatarFallback className='text-xs font-semibold bg-[#5865F2] text-white'>
                  {currentContact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {currentContact.online && (
                <span className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#1c1f26] rounded-full'></span>
              )}
            </div>
            <div>
              <h3 className='text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight'>
                {currentContact.name}
              </h3>
              <p className='text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5'>
                {currentContact.online ? (
                  <span className='inline-flex items-center gap-1'>
                    <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full'></span>
                    Online
                  </span>
                ) : (
                  <span>Last seen {currentContact.time}</span>
                )}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-0.5'>
            <Button 
              size='icon' 
              variant='ghost' 
              className='h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all'
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className='w-[15px] h-[15px]' strokeWidth={2} />
            </Button>
            <Button size='icon' variant='ghost' className='h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all'>
              <Phone className='w-[15px] h-[15px]' strokeWidth={2} />
            </Button>
            <Button size='icon' variant='ghost' className='h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all'>
              <Video className='w-[15px] h-[15px]' strokeWidth={2} />
            </Button>
            <Button size='icon' variant='ghost' className='h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all'>
              <MoreVertical className='w-[15px] h-[15px]' strokeWidth={2} />
            </Button>
          </div>
        </div>

        {/* Search Bar (Conditional) */}
        {showSearch && (
          <div className='px-3 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1117]'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400' strokeWidth={2} />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search messages...'
                className='w-full h-8 pl-8 pr-8 bg-white dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:border-transparent transition-all'
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className='absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors'
                >
                  <X className='w-3.5 h-3.5' strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Chat Messages - Consistent Typography */}
        <div className='flex-1 overflow-y-auto p-3 bg-slate-50 dark:bg-[#0d1117]'>
          <div className='max-w-4xl mx-auto space-y-1.5'>
            {/* Date Separator */}
            <div className='flex items-center gap-2 my-3'>
              <div className='flex-1 h-px bg-slate-200 dark:bg-slate-700'></div>
              <span className='text-[9px] font-semibold text-slate-400 dark:text-slate-500 px-2 py-1 bg-white dark:bg-[#1c1f26] rounded-full border border-slate-200 dark:border-slate-700'>
                Today, October 18
              </span>
              <div className='flex-1 h-px bg-slate-200 dark:bg-slate-700'></div>
            </div>

            {messages.map((message, index) => {
              const isConsecutive = index > 0 && messages[index - 1].sender === message.sender

              return (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'} ${
                    isConsecutive ? 'mt-0.5' : 'mt-2'
                  }`}
                >
                  <div className={`flex flex-col ${message.sender === 'admin' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <div
                      className={`px-3 py-2 rounded-lg text-xs leading-relaxed ${
                        message.sender === 'admin'
                          ? 'bg-[#5865F2] text-white rounded-tr-sm'
                          : 'bg-white dark:bg-[#1c1f26] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-sm'
                      }`}
                    >
                      {message.text}
                    </div>
                    {!isConsecutive && (
                      <div className='flex items-center gap-1 mt-0.5 px-0.5'>
                        <span className='text-[9px] text-slate-400 dark:text-slate-500'>
                          {message.time}
                        </span>
                        {message.sender === 'admin' && message.status && (
                          <span className='text-[9px] text-slate-400 dark:text-slate-500'>
                            {message.status === 'read' && '✓✓'}
                            {message.status === 'delivered' && '✓'}
                            {message.status === 'sent' && '✓'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Typing Indicator */}
            <div className='flex justify-start mt-2'>
              <div className='px-3 py-2 rounded-lg rounded-tl-sm bg-white dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-700'>
                <div className='flex gap-1'>
                  <div className='w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
                  <div className='w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
                  <div className='w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input - Consistent Symmetry */}
        <div className='p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f26]'>
          {/* Attachment Menu */}
          {showAttachMenu && (
            <div className='mb-2 p-2.5 bg-slate-50 dark:bg-[#0d1117] rounded-lg border border-slate-200 dark:border-slate-700'>
              <div className='grid grid-cols-3 gap-1.5'>
                {attachmentOptions.map((option) => (
                  <button
                    key={option.label}
                    className='flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white dark:hover:bg-[#1c1f26] transition-all group'
                    onClick={() => setShowAttachMenu(false)}
                  >
                    <div className={`w-9 h-9 rounded-full ${option.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <option.icon className={`w-4 h-4 ${option.color}`} strokeWidth={2} />
                    </div>
                    <span className='text-[9px] font-medium text-slate-600 dark:text-slate-400 text-center leading-tight'>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area - Consistent Height */}
          <div className='flex items-center gap-2'>
            {/* Attachment Button */}
            <Button
              size='icon'
              variant='ghost'
              className='h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all flex-shrink-0'
              onClick={() => setShowAttachMenu(!showAttachMenu)}
            >
              {showAttachMenu ? (
                <X className='w-[16px] h-[16px]' strokeWidth={2.5} />
              ) : (
                <Plus className='w-[16px] h-[16px]' strokeWidth={2.5} />
              )}
            </Button>

            {/* Message Input / Recording Indicator */}
            <div className='flex-1 flex items-center gap-2 px-3 h-9 bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all'>
              {isRecording ? (
                <>
                  <div className='w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0'></div>
                  <span className='text-xs text-slate-600 dark:text-slate-400 font-medium flex-1'>
                    Recording...
                  </span>
                  <span className='text-[10px] text-slate-400 dark:text-slate-500 font-mono flex-shrink-0'>
                    0:00
                  </span>
                  <button
                    onClick={() => setIsRecording(false)}
                    className='text-slate-400 hover:text-red-500 transition-colors flex-shrink-0'
                  >
                    <X className='w-3.5 h-3.5' strokeWidth={2.5} />
                  </button>
                </>
              ) : (
                <>
                  <input
                    type='text'
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder='Type a message...'
                    className='flex-1 bg-transparent border-0 outline-none text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        if (messageInput.trim()) {
                          // Handle send
                          setMessageInput('')
                        }
                      }
                    }}
                  />
                  {!messageInput && (
                    <Button 
                      size='icon' 
                      variant='ghost' 
                      className='h-6 w-6 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex-shrink-0'
                    >
                      <Smile className='w-[14px] h-[14px]' />
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Send Button / Voice Button */}
            {messageInput.trim() || isRecording ? (
              <Button
                size='icon'
                className='h-9 w-9 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] transition-all flex-shrink-0'
                onClick={() => {
                  if (isRecording) {
                    setIsRecording(false)
                    // Send voice message
                  } else if (messageInput.trim()) {
                    // Send text message
                    setMessageInput('')
                  }
                }}
              >
                <Send className='w-[16px] h-[16px]' strokeWidth={2.5} />
              </Button>
            ) : (
              <Button
                size='icon'
                variant='ghost'
                className='h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all flex-shrink-0'
                onClick={handleVoiceRecord}
              >
                <Mic className='w-[16px] h-[16px]' strokeWidth={2.5} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Column 4: Customer Info Panel - Compact & Detailed */}
      <div className='w-64 bg-white dark:bg-[#1c1f26] border-l border-slate-200 dark:border-slate-800 flex flex-col'>
        <Tabs defaultValue='info' className='flex flex-col h-full'>
          <TabsList className='w-full h-11 rounded-none border-b border-slate-200 dark:border-slate-800 bg-transparent p-0 grid grid-cols-2'>
            <TabsTrigger
              value='info'
              className='h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#5865F2] data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all text-xs font-semibold text-slate-500 dark:text-slate-400 data-[state=active]:text-[#5865F2]'
            >
              Info
            </TabsTrigger>
            <TabsTrigger
              value='ai'
              className='h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#5865F2] data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all text-xs font-semibold text-slate-500 dark:text-slate-400 data-[state=active]:text-[#5865F2]'
            >
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value='info' className='flex-1 overflow-y-auto p-3 space-y-3 m-0'>
            {/* Contact Information */}
            <div className='space-y-2'>
              <h3 className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide'>
                Contact
              </h3>
              <div className='space-y-1.5'>
                <div className='flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer border border-slate-200 dark:border-slate-700'>
                  <div className='w-7 h-7 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-3.5 h-3.5 text-blue-600 dark:text-blue-400' strokeWidth={2} />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-[9px] font-medium text-slate-400 dark:text-slate-500'>Email</p>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100 truncate'>
                      rahul.sharma@company.in
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer border border-slate-200 dark:border-slate-700'>
                  <div className='w-7 h-7 rounded-md bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0'>
                    <Phone className='w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400' strokeWidth={2} />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-[9px] font-medium text-slate-400 dark:text-slate-500'>Phone</p>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>+91 98765 43210</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer border border-slate-200 dark:border-slate-700'>
                  <div className='w-7 h-7 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0'>
                    <MapPin className='w-3.5 h-3.5 text-purple-600 dark:text-purple-400' strokeWidth={2} />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-[9px] font-medium text-slate-400 dark:text-slate-500'>Location</p>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100 truncate'>Mumbai, Maharashtra</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Metrics */}
            <div className='space-y-2'>
              <h3 className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide'>
                Metrics
              </h3>
              <div className='grid grid-cols-2 gap-1.5'>
                <div className='p-2 rounded-lg bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-[9px] font-medium text-slate-400 dark:text-slate-500 mb-1'>Tickets</p>
                  <p className='text-xl font-bold text-slate-900 dark:text-slate-100'>24</p>
                </div>
                <div className='p-2 rounded-lg bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-[9px] font-medium text-slate-400 dark:text-slate-500 mb-1'>Resolved</p>
                  <p className='text-xl font-bold text-emerald-600 dark:text-emerald-500'>21</p>
                </div>
                <div className='p-2 rounded-lg bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-[9px] font-medium text-slate-400 dark:text-slate-500 mb-1'>Response</p>
                  <p className='text-xl font-bold text-blue-600 dark:text-blue-500'>5m</p>
                </div>
                <div className='p-2 rounded-lg bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-[9px] font-medium text-slate-400 dark:text-slate-500 mb-1'>Rating</p>
                  <p className='text-xl font-bold text-amber-600 dark:text-amber-500'>98%</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className='space-y-2'>
              <h3 className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide'>
                Activity
              </h3>
              <div className='space-y-1.5'>
                <div className='flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <div className='w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0'>
                    <CheckCircle2 className='w-3 h-3 text-emerald-600 dark:text-emerald-400' strokeWidth={2} />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Logged in</p>
                    <p className='text-[10px] text-slate-500 dark:text-slate-400'>2 hours ago</p>
                  </div>
                </div>
                <div className='flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <div className='w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0'>
                    <Zap className='w-3 h-3 text-blue-600 dark:text-blue-400' strokeWidth={2} />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Updated profile</p>
                    <p className='text-[10px] text-slate-500 dark:text-slate-400'>1 day ago</p>
                  </div>
                </div>
                <div className='flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <div className='w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0'>
                    <TrendingUp className='w-3 h-3 text-amber-600 dark:text-amber-400' strokeWidth={2} />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Ticket created</p>
                    <p className='text-[10px] text-slate-500 dark:text-slate-400'>3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className='space-y-2'>
              <h3 className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide'>
                Tags
              </h3>
              <div className='flex flex-wrap gap-1'>
                <span className='px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[9px] font-medium rounded'>
                  VIP
                </span>
                <span className='px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-[9px] font-medium rounded'>
                  Premium
                </span>
                <span className='px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[9px] font-medium rounded'>
                  Active
                </span>
              </div>
            </div>

            {/* Notes */}
            <div className='space-y-2'>
              <h3 className='text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide'>
                Notes
              </h3>
              <div className='p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30'>
                <p className='text-xs text-slate-700 dark:text-slate-300 leading-relaxed'>
                  VIP customer - Priority support. Pichla billing issue Oct 15 ko resolve ho gaya.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='ai' className='flex-1 flex flex-col m-0'>
            <div className='flex-1 overflow-y-auto p-3 space-y-2.5'>
              {/* AI Messages */}
              <div className='flex gap-2'>
                <div className='w-6 h-6 rounded-md bg-[#5865F2] flex items-center justify-center flex-shrink-0'>
                  <Sparkles className='w-3 h-3 text-white' />
                </div>
                <div className='flex-1 p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-xs leading-relaxed text-slate-900 dark:text-slate-100'>
                    Hi! I can help with customer insights and quick actions.
                  </p>
                </div>
              </div>

              <div className='flex gap-2 justify-end'>
                <div className='p-2 rounded-md bg-[#5865F2] text-white max-w-[85%]'>
                  <p className='text-xs leading-relaxed'>Is customer ka status kya hai?</p>
                </div>
              </div>

              <div className='flex gap-2'>
                <div className='w-6 h-6 rounded-md bg-[#5865F2] flex items-center justify-center flex-shrink-0'>
                  <Sparkles className='w-3 h-3 text-white' />
                </div>
                <div className='flex-1 p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-xs leading-relaxed text-slate-900 dark:text-slate-100 mb-1.5'>
                    Rahul Sharma ek active Pro customer hain:
                  </p>
                  <div className='space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400'>
                    <p>• 2 ghante pehle active</p>
                    <p>• Pro Plan (₹2,499/month)</p>
                    <p>• 3 resolved tickets</p>
                    <p>• 98% satisfaction</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className='pt-2 space-y-1.5'>
                <p className='text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider'>
                  Quick Actions
                </p>
                <button className='w-full text-left p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all border border-slate-200 dark:border-slate-700'>
                  <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Ticket history dekhen</p>
                  <p className='text-[10px] text-slate-500 dark:text-slate-400 mt-0.5'>Saare conversations</p>
                </button>
                <button className='w-full text-left p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all border border-slate-200 dark:border-slate-700'>
                  <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Summary generate karen</p>
                  <p className='text-[10px] text-slate-500 dark:text-slate-400 mt-0.5'>AI summary</p>
                </button>
                <button className='w-full text-left p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all border border-slate-200 dark:border-slate-700'>
                  <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Follow-up bhejein</p>
                  <p className='text-[10px] text-slate-500 dark:text-slate-400 mt-0.5'>Auto message</p>
                </button>
              </div>
            </div>

            {/* AI Input */}
            <div className='p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f26]'>
              <div className='flex items-center gap-2'>
                <input
                  type='text'
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder='Ask AI...'
                  className='flex-1 h-8 px-2.5 bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5865F2]'
                />
                <Button
                  size='icon'
                  className='h-8 w-8 rounded-md bg-[#5865F2] hover:bg-[#4752C4] transition-all flex-shrink-0'
                >
                  <Send className='w-3.5 h-3.5' />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
