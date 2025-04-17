// src/app/notifications/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Bell, Settings, MessageSquare, Heart, User, BookOpen, ChevronLeft, Trash2, Check } from 'lucide-react';

// Define notification types
type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  read: boolean;
  userImage?: string;
  postTitle?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching notifications from an API
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // This would be a real API call in a production app
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample notification data
        const mockNotifications: Notification[] = [
          {
            id: '1',
            type: 'like',
            message: 'Sarah Johnson liked your article "Getting Started with Next.js"',
            timestamp: '2025-04-17T10:30:00Z',
            read: false,
            userImage: '/api/placeholder/40/40',
            postTitle: 'Getting Started with Next.js'
          },
          {
            id: '2',
            type: 'comment',
            message: 'Alex Chen commented on your article "Mastering Tailwind CSS"',
            timestamp: '2025-04-16T18:45:00Z',
            read: true,
            userImage: '/api/placeholder/40/40',
            postTitle: 'Mastering Tailwind CSS'
          },
          {
            id: '3',
            type: 'follow',
            message: 'Miguel Rodriguez started following you',
            timestamp: '2025-04-16T14:20:00Z',
            read: false,
            userImage: '/api/placeholder/40/40'
          },
          {
            id: '4',
            type: 'system',
            message: 'Your article "TypeScript Best Practices" has been published',
            timestamp: '2025-04-15T09:10:00Z',
            read: true,
            postTitle: 'TypeScript Best Practices'
          },
          {
            id: '5',
            type: 'mention',
            message: 'Lisa Wong mentioned you in a comment',
            timestamp: '2025-04-14T16:30:00Z',
            read: false,
            userImage: '/api/placeholder/40/40'
          },
          {
            id: '6',
            type: 'like',
            message: 'David Smith and 5 others liked your article "React Hooks Explained"',
            timestamp: '2025-04-14T11:15:00Z',
            read: true,
            userImage: '/api/placeholder/40/40',
            postTitle: 'React Hooks Explained'
          },
          {
            id: '7',
            type: 'system',
            message: 'Your blog has reached 1,000 subscribers!',
            timestamp: '2025-04-13T20:00:00Z',
            read: true
          },
          {
            id: '8',
            type: 'comment',
            message: 'Jessica Lee replied to your comment on "Building a Blog with Next.js"',
            timestamp: '2025-04-12T13:45:00Z',
            read: false,
            userImage: '/api/placeholder/40/40',
            postTitle: 'Building a Blog with Next.js'
          }
        ];
        
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-pink-500 dark:text-pink-400" />;
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
      case 'follow':
        return <User className="h-5 w-5 text-green-500 dark:text-green-400" />;
      case 'mention':
        return <MessageSquare className="h-5 w-5 text-purple-500 dark:text-purple-400" />;
      case 'system':
        return <BookOpen className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === filter);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1A1A1A] transition-colors duration-200 pb-8">
      <div className="mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-[#333333] flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-indigo-100 dark:bg-[#00e5ff42]">
                <Bell className="h-6 w-6 text-indigo-600 dark:text-[#00e5FF]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Notifications</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stay updated with your blog activity</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center transition-colors"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Mark all read
                </button>
              )}
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Filter tabs */}
          <div className="my-2">
            <div className="flex overflow-x-auto py-3 px-4 gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  filter === 'all' 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('like')}
                className={`px-4 py-2 text-sm font-medium rounded-full flex items-center transition-colors ${
                  filter === 'like' 
                    ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Heart className="h-4 w-4 mr-1" /> Likes
              </button>
              <button
                onClick={() => setFilter('comment')}
                className={`px-4 py-2 text-sm font-medium rounded-full flex items-center transition-colors ${
                  filter === 'comment' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-1" /> Comments
              </button>
              <button
                onClick={() => setFilter('follow')}
                className={`px-4 py-2 text-sm font-medium rounded-full flex items-center transition-colors ${
                  filter === 'follow' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <User className="h-4 w-4 mr-1" /> Follows
              </button>
              <button
                onClick={() => setFilter('system')}
                className={`px-4 py-2 text-sm font-medium rounded-full flex items-center transition-colors ${
                  filter === 'system' 
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <BookOpen className="h-4 w-4 mr-1" /> System
              </button>
            </div>
          </div>
        <div className="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-[#333333] transition-colors duration-200">
          {/* Notifications count */}
          {!loading && (
            <div className="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700">
              {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              {unreadCount > 0 && filter === 'all' && (
                <span className="ml-2 text-indigo-600 dark:text-indigo-400">
                  ({unreadCount} unread)
                </span>
              )}
            </div>
          )}

          {/* Notifications list */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-6 bg-white dark:bg-gray-800">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
                      <div className="flex-1 space-y-3 py-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : filteredNotifications.length === 0 ? (
              <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
                <Bell className="h-12 w-12 mb-3 opacity-30" />
                <p className="text-lg font-medium mb-1">No notifications found</p>
                <p className="text-sm">Check back later for updates</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-5 hover:bg-gray-50 dark:hover:bg-[#242424] flex group transition-colors ${
                    !notification.read ? 'bg-blue-50/80 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="mr-4 mt-1">
                    {notification.userImage ? (
                      <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
                        <img 
                          src={notification.userImage} 
                          alt="User" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ring-2 ring-gray-200 dark:ring-[#333333]">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className={`text-sm ${!notification.read ? 'font-medium' : ''} text-gray-900 dark:text-gray-100`}>
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    {notification.postTitle && (
                      <a 
                        href="#" 
                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 block"
                      >
                        {notification.postTitle}
                      </a>
                    )}
                  </div>
                  
                  {/* Action buttons - only visible on hover */}
                  <div className="ml-2 flex items-start space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      title="Delete notification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Footer */}
          {!loading && filteredNotifications.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-center">
              <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                View more notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}