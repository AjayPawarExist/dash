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

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('Messages')
  const [activeSubmenu, setActiveSubmenu] = useState('All Conversations')
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

  const messages: Message[] = [
    { id: 1, text: "Hi, I need help with my account", sender: 'user', time: '10:30 AM', status: 'read' },
    { id: 2, text: "Hello! I'd be happy to help. What seems to be the issue?", sender: 'admin', time: '10:31 AM', status: 'read' },
    { id: 3, text: "I can't access my billing dashboard", sender: 'user', time: '10:32 AM', status: 'read' },
    { id: 4, text: "Let me check that for you right away", sender: 'admin', time: '10:32 AM', status: 'read' },
    { id: 5, text: "Could you try logging out and back in?", sender: 'admin', time: '10:33 AM', grouped: true, status: 'read' },
    { id: 6, text: "Yes, I tried that but it's still not working", sender: 'user', time: '10:35 AM', status: 'delivered' },
  ]

  const togglePin = (item: string) => {
    setPinnedItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
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

  const currentSubmenu = navItems.find(item => item.label === activeNav)?.submenu || []

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

      {/* Column 2: Submenu - Compact & Clean */}
      <div className='w-56 bg-white dark:bg-[#1c1f26] border-r border-slate-200 dark:border-slate-800 flex flex-col'>
        {/* Header with Search */}
        <div className='h-14 px-3 flex items-center border-b border-slate-200 dark:border-slate-800'>
          <div className='relative w-full'>
            <Search className='absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400' />
            <input
              type='text'
              placeholder='Search...'
              className='w-full h-8 pl-8 pr-2.5 bg-slate-50 dark:bg-[#0d1117] border-0 rounded-md text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all'
            />
          </div>
        </div>

        {/* Submenu Title */}
        <div className='px-3 py-2 border-b border-slate-200 dark:border-slate-800'>
          <h2 className='text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider'>
            {activeNav}
          </h2>
        </div>

        {/* Submenu Items */}
        <div className='flex-1 overflow-y-auto px-2 py-2'>
          {currentSubmenu.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSubmenu(item)}
              className={`w-full flex items-center justify-between h-8 px-2.5 mb-0.5 rounded-md transition-all text-xs ${
                activeSubmenu === item
                  ? 'bg-[#5865F2] text-white font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-normal'
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Column 3: Chat Section - Professional & Compact */}
      <div className='flex-1 flex flex-col bg-white dark:bg-[#1c1f26] min-w-0'>
        {/* User Info Bar - Clean */}
        <div className='h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f26] shadow-sm'>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <Avatar className='w-9 h-9 ring-2 ring-white dark:ring-[#1c1f26]'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className='text-xs font-semibold bg-[#5865F2] text-white'>JD</AvatarFallback>
              </Avatar>
              <span className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#1c1f26] rounded-full'></span>
            </div>
            <div>
              <h3 className='text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight'>John Doe</h3>
              <p className='text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5'>
                <span className='inline-flex items-center gap-1'>
                  <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full'></span>
                  Online • Pro Plan
                </span>
              </p>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <Button 
              size='icon' 
              variant='ghost' 
              className='h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all'
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className='w-[16px] h-[16px]' strokeWidth={2} />
            </Button>
            <Button size='icon' variant='ghost' className='h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all'>
              <Phone className='w-[16px] h-[16px]' strokeWidth={2} />
            </Button>
            <Button size='icon' variant='ghost' className='h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all'>
              <Video className='w-[16px] h-[16px]' strokeWidth={2} />
            </Button>
            <Button size='icon' variant='ghost' className='h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all'>
              <MoreVertical className='w-[16px] h-[16px]' strokeWidth={2} />
            </Button>
          </div>
        </div>

        {/* Search Bar (Conditional) */}
        {showSearch && (
          <div className='px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1117]'>
            <div className='relative max-w-4xl mx-auto'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' strokeWidth={2} />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search messages...'
                className='w-full h-9 pl-10 pr-10 bg-white dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:border-transparent transition-all'
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors'
                >
                  <X className='w-4 h-4' strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Chat Messages - Clean & Practical */}
        <div className='flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-[#0d1117]'>
          <div className='max-w-4xl mx-auto space-y-2'>
            {/* Date Separator */}
            <div className='flex items-center gap-3 my-4'>
              <div className='flex-1 h-px bg-slate-200 dark:bg-slate-700'></div>
              <span className='text-[10px] font-semibold text-slate-400 dark:text-slate-500 px-2.5 py-1 bg-white dark:bg-[#1c1f26] rounded-full border border-slate-200 dark:border-slate-700'>
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
                    isConsecutive ? 'mt-1' : 'mt-3'
                  }`}
                >
                  <div className={`flex flex-col ${message.sender === 'admin' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed shadow-sm ${
                        message.sender === 'admin'
                          ? 'bg-[#5865F2] text-white rounded-tr-sm'
                          : 'bg-white dark:bg-[#1c1f26] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-sm'
                      }`}
                    >
                      {message.text}
                    </div>
                    {!isConsecutive && (
                      <div className='flex items-center gap-1.5 mt-1 px-1'>
                        <span className='text-[10px] text-slate-400 dark:text-slate-500'>
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
            <div className='flex justify-start mt-3'>
              <div className='px-4 py-3 rounded-xl rounded-tl-sm bg-white dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-700 shadow-sm'>
                <div className='flex gap-1.5'>
                  <div className='w-2 h-2 bg-slate-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
                  <div className='w-2 h-2 bg-slate-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
                  <div className='w-2 h-2 bg-slate-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input - Professional WhatsApp-style */}
        <div className='p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f26]'>
          <div className='max-w-4xl mx-auto'>
            {/* Attachment Menu */}
            {showAttachMenu && (
              <div className='mb-3 p-3 bg-slate-50 dark:bg-[#0d1117] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm'>
                <div className='grid grid-cols-3 gap-2'>
                  {attachmentOptions.map((option) => (
                    <button
                      key={option.label}
                      className='flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white dark:hover:bg-[#1c1f26] transition-all group'
                      onClick={() => setShowAttachMenu(false)}
                    >
                      <div className={`w-11 h-11 rounded-full ${option.bg} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                        <option.icon className={`w-5 h-5 ${option.color}`} strokeWidth={2} />
                      </div>
                      <span className='text-[10px] font-medium text-slate-600 dark:text-slate-400 text-center leading-tight'>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area - Fixed Height for Symmetry */}
            <div className='flex items-center gap-2 h-11'>
              {/* Attachment Button */}
              <Button
                size='icon'
                variant='ghost'
                className='h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all flex-shrink-0'
                onClick={() => setShowAttachMenu(!showAttachMenu)}
              >
                {showAttachMenu ? (
                  <X className='w-[18px] h-[18px]' strokeWidth={2.5} />
                ) : (
                  <Plus className='w-[18px] h-[18px]' strokeWidth={2.5} />
                )}
              </Button>

              {/* Message Input / Recording Indicator - Fixed Height */}
              <div className='flex-1 flex items-center gap-2.5 px-3.5 h-10 bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all'>
                {isRecording ? (
                  <>
                    <div className='w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse flex-shrink-0'></div>
                    <span className='text-xs text-slate-600 dark:text-slate-400 font-medium flex-1'>
                      Recording audio message...
                    </span>
                    <span className='text-xs text-slate-400 dark:text-slate-500 font-mono flex-shrink-0'>
                      0:00
                    </span>
                    <button
                      onClick={() => setIsRecording(false)}
                      className='text-slate-400 hover:text-red-500 transition-colors flex-shrink-0 -mr-1'
                    >
                      <X className='w-4 h-4' strokeWidth={2.5} />
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type='text'
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder='Type a message...'
                      className='flex-1 bg-transparent border-0 outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400'
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
                        className='h-7 w-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 flex-shrink-0'
                      >
                        <Smile className='w-[15px] h-[15px]' />
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* Send Button / Voice Button - Consistent Size */}
              {messageInput.trim() || isRecording ? (
                <Button
                  size='icon'
                  className='h-10 w-10 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] transition-all flex-shrink-0 shadow-md hover:shadow-lg'
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
                  <Send className='w-[18px] h-[18px]' strokeWidth={2.5} />
                </Button>
              ) : (
                <Button
                  size='icon'
                  variant='ghost'
                  className='h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all flex-shrink-0'
                  onClick={handleVoiceRecord}
                >
                  <Mic className='w-[18px] h-[18px]' strokeWidth={2.5} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Column 4: Info Panel - Compact & Detailed */}
      <div className='w-72 bg-white dark:bg-[#1c1f26] border-l border-slate-200 dark:border-slate-800 flex flex-col'>
        <Tabs defaultValue='info' className='flex flex-col h-full'>
          <TabsList className='w-full h-11 rounded-none border-b border-slate-200 dark:border-slate-800 bg-transparent p-0.5 grid grid-cols-2'>
            <TabsTrigger
              value='info'
              className='h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#5865F2] data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all text-xs font-semibold text-slate-500 dark:text-slate-400 data-[state=active]:text-[#5865F2]'
            >
              Customer Info
            </TabsTrigger>
            <TabsTrigger
              value='ai'
              className='h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#5865F2] data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all text-xs font-semibold text-slate-500 dark:text-slate-400 data-[state=active]:text-[#5865F2]'
            >
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value='info' className='flex-1 overflow-y-auto p-3 space-y-4 m-0'>
            {/* Contact Information */}
            <div className='space-y-2'>
              <h3 className='text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider'>
                Contact Details
              </h3>
              <div className='space-y-1.5'>
                <div className='flex items-center gap-2.5 p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer'>
                  <div className='w-7 h-7 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-3.5 h-3.5 text-blue-600 dark:text-blue-400' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-[10px] text-slate-400 dark:text-slate-500'>Email</p>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100 truncate'>
                      john.doe@example.com
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2.5 p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer'>
                  <div className='w-7 h-7 rounded-md bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0'>
                    <Phone className='w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-[10px] text-slate-400 dark:text-slate-500'>Phone</p>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className='flex items-center gap-2.5 p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer'>
                  <div className='w-7 h-7 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0'>
                    <MapPin className='w-3.5 h-3.5 text-purple-600 dark:text-purple-400' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-[10px] text-slate-400 dark:text-slate-500'>Location</p>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className='space-y-2'>
              <h3 className='text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider'>
                Subscription Plan
              </h3>
              <div className='p-2.5 rounded-md bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 rounded-md bg-[#5865F2] flex items-center justify-center'>
                      <CreditCard className='w-3 h-3 text-white' />
                    </div>
                    <span className='font-semibold text-xs text-slate-900 dark:text-slate-100'>Pro Plan</span>
                  </div>
                  <span className='text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold uppercase'>
                    Active
                  </span>
                </div>
                <p className='text-xl font-bold text-slate-900 dark:text-slate-100 mb-1'>$29<span className='text-xs font-normal text-slate-500 dark:text-slate-400'>/mo</span></p>
                <p className='text-[10px] text-slate-500 dark:text-slate-400'>Renews Jan 15, 2026</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className='space-y-2'>
              <h3 className='text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider'>
                Support Metrics
              </h3>
              <div className='grid grid-cols-2 gap-1.5'>
                <div className='p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-[10px] text-slate-500 dark:text-slate-400 mb-1'>Total Tickets</p>
                  <p className='text-lg font-bold text-slate-900 dark:text-slate-100'>24</p>
                  <p className='text-[9px] text-slate-400 dark:text-slate-500'>All time</p>
                </div>
                <div className='p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-[10px] text-slate-500 dark:text-slate-400 mb-1'>Resolved</p>
                  <p className='text-lg font-bold text-emerald-600'>21</p>
                  <p className='text-[9px] text-emerald-600'>87.5% rate</p>
                </div>
                <div className='p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-[10px] text-slate-500 dark:text-slate-400 mb-1'>Response Time</p>
                  <p className='text-lg font-bold text-blue-600'>5m</p>
                  <p className='text-[9px] text-blue-600'>Avg time</p>
                </div>
                <div className='p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-[10px] text-slate-500 dark:text-slate-400 mb-1'>Satisfaction</p>
                  <p className='text-lg font-bold text-amber-600'>98%</p>
                  <p className='text-[9px] text-amber-600'>156 reviews</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className='space-y-2'>
              <h3 className='text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider'>
                Recent Activity
              </h3>
              <div className='space-y-1.5'>
                <div className='flex items-start gap-2 p-2 rounded-md bg-slate-50 dark:bg-[#0d1117]'>
                  <div className='w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0'>
                    <CheckCircle2 className='w-3 h-3 text-emerald-600 dark:text-emerald-400' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Logged in</p>
                    <p className='text-[10px] text-slate-500 dark:text-slate-400'>2 hours ago</p>
                  </div>
                </div>
                <div className='flex items-start gap-2 p-2 rounded-md bg-slate-50 dark:bg-[#0d1117]'>
                  <div className='w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0'>
                    <Zap className='w-3 h-3 text-blue-600 dark:text-blue-400' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Updated profile</p>
                    <p className='text-[10px] text-slate-500 dark:text-slate-400'>1 day ago</p>
                  </div>
                </div>
                <div className='flex items-start gap-2 p-2 rounded-md bg-slate-50 dark:bg-[#0d1117]'>
                  <div className='w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0'>
                    <TrendingUp className='w-3 h-3 text-amber-600 dark:text-amber-400' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Viewed analytics</p>
                    <p className='text-[10px] text-slate-500 dark:text-slate-400'>3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Tags */}
            <div className='space-y-2'>
              <h3 className='text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider'>
                Tags
              </h3>
              <div className='flex flex-wrap gap-1.5'>
                <span className='px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-medium rounded'>
                  VIP
                </span>
                <span className='px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-[10px] font-medium rounded'>
                  Premium
                </span>
                <span className='px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-medium rounded'>
                  Active
                </span>
                <span className='px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-medium rounded'>
                  Priority
                </span>
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
                  <p className='text-xs leading-relaxed'>What's this customer's status?</p>
                </div>
              </div>

              <div className='flex gap-2'>
                <div className='w-6 h-6 rounded-md bg-[#5865F2] flex items-center justify-center flex-shrink-0'>
                  <Sparkles className='w-3 h-3 text-white' />
                </div>
                <div className='flex-1 p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-700'>
                  <p className='text-xs leading-relaxed text-slate-900 dark:text-slate-100 mb-1.5'>
                    John Doe is an active Pro customer:
                  </p>
                  <div className='space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400'>
                    <p>• Active 2 hours ago</p>
                    <p>• Pro Plan ($29/mo)</p>
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
                  <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>View ticket history</p>
                  <p className='text-[10px] text-slate-500 dark:text-slate-400 mt-0.5'>All conversations</p>
                </button>
                <button className='w-full text-left p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all border border-slate-200 dark:border-slate-700'>
                  <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Generate summary</p>
                  <p className='text-[10px] text-slate-500 dark:text-slate-400 mt-0.5'>AI summary</p>
                </button>
                <button className='w-full text-left p-2 rounded-md bg-slate-50 dark:bg-[#0d1117] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all border border-slate-200 dark:border-slate-700'>
                  <p className='text-xs font-medium text-slate-900 dark:text-slate-100'>Send follow-up</p>
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
