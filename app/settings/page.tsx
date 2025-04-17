"use client"
// pages/settings.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

import Image from 'next/image';

// Define types for our settings
interface UserSettings {
  displayName: string;
  email: string;
  bio: string;
  profilePicture: string;
  notificationPreferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    newsletterSubscription: boolean;
    commentReplies: boolean;
    newFollowers: boolean;
  };
  privacySettings: {
    profileVisibility: 'public' | 'private' | 'followers';
    showEmail: boolean;
    allowComments: boolean;
    allowSharing: boolean;
  };
  appearanceSettings: {
    theme: 'light' | 'dark' | 'system';
    fontSize: 'small' | 'medium' | 'large';
    compactView: boolean;
  };
  contentPreferences: {
    categories: string[];
    language: string;
  };
}

// Mock data for available categories and languages
const availableCategories = [
  'Technology', 'Travel', 'Food', 'Fashion', 'Health', 
  'Fitness', 'Business', 'Finance', 'Art', 'Science'
];

const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
];

export default function Settings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Initialize with default settings
  const [settings, setSettings] = useState<UserSettings>({
    displayName: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'I love writing about technology and travel.',
    profilePicture: '/default-avatar.png',
    notificationPreferences: {
      emailNotifications: true,
      pushNotifications: true,
      newsletterSubscription: true,
      commentReplies: true,
      newFollowers: true
    },
    privacySettings: {
      profileVisibility: 'public',
      showEmail: false,
      allowComments: true,
      allowSharing: true
    },
    appearanceSettings: {
      theme: 'system',
      fontSize: 'medium',
      compactView: false
    },
    contentPreferences: {
      categories: ['Technology', 'Travel'],
      language: 'en'
    }
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (section: string, setting: string) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof UserSettings],
        [setting]: !(settings[section as keyof UserSettings] as any)[setting]
      }
    });
  };

  // Handle nested select changes
  const handleSelectChange = (section: string, setting: string, value: any) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof UserSettings],
        [setting]: value
      }
    });
  };

  // Handle category selection
  const handleCategoryToggle = (category: string) => {
    const currentCategories = settings.contentPreferences.categories;
    let newCategories;
    
    if (currentCategories.includes(category)) {
      newCategories = currentCategories.filter(c => c !== category);
    } else {
      newCategories = [...currentCategories, category];
    }
    
    setSettings({
      ...settings,
      contentPreferences: {
        ...settings.contentPreferences,
        categories: newCategories
      }
    });
  };

  // Handle file upload for profile picture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save settings
  const saveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (imagePreview) {
        setSettings({
          ...settings,
          profilePicture: imagePreview
        });
      }
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Settings content */}
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-medium leading-6 text-gray-900">Settings</h2>
              <p className="mt-1 text-sm text-gray-600">
                Manage your account settings and preferences.
              </p>
              
              {/* Settings navigation */}
              <nav className="mt-5 space-y-1" aria-label="Settings">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`${
                    activeTab === 'profile'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } flex items-center px-3 py-2 text-sm font-medium border-l-4 w-full text-left`}
                >
                  <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`${
                    activeTab === 'notifications'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } flex items-center px-3 py-2 text-sm font-medium border-l-4 w-full text-left`}
                >
                  <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notifications
                </button>

                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`${
                    activeTab === 'privacy'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } flex items-center px-3 py-2 text-sm font-medium border-l-4 w-full text-left`}
                >
                  <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Privacy & Security
                </button>

                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`${
                    activeTab === 'appearance'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } flex items-center px-3 py-2 text-sm font-medium border-l-4 w-full text-left`}
                >
                  <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Appearance
                </button>

                <button
                  onClick={() => setActiveTab('content')}
                  className={`${
                    activeTab === 'content'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } flex items-center px-3 py-2 text-sm font-medium border-l-4 w-full text-left`}
                >
                  <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Content Preferences
                </button>
              </nav>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                          Display Name
                        </label>
                        <input
                          type="text"
                          name="displayName"
                          id="displayName"
                          value={settings.displayName}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={settings.email}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          rows={3}
                          value={settings.bio}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description for your profile. URLs are hyperlinked.
                        </p>
                      </div>

                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Profile Picture
                        </label>
                        <div className="mt-2 flex items-center space-x-5">
                          <div className="flex-shrink-0">
                            <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                              {imagePreview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={imagePreview} alt="Profile preview" className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-indigo-600 text-xl font-bold">
                                  {settings.displayName.charAt(0)}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="profile-photo"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                            >
                              <span>Change</span>
                              <input
                                id="profile-photo"
                                name="profile-photo"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="emailNotifications"
                            name="emailNotifications"
                            type="checkbox"
                            checked={settings.notificationPreferences.emailNotifications}
                            onChange={() => handleCheckboxChange('notificationPreferences', 'emailNotifications')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                            Email Notifications
                          </label>
                          <p className="text-gray-500">Receive email notifications for important updates.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="pushNotifications"
                            name="pushNotifications"
                            type="checkbox"
                            checked={settings.notificationPreferences.pushNotifications}
                            onChange={() => handleCheckboxChange('notificationPreferences', 'pushNotifications')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="pushNotifications" className="font-medium text-gray-700">
                            Push Notifications
                          </label>
                          <p className="text-gray-500">Allow browser push notifications.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newsletterSubscription"
                            name="newsletterSubscription"
                            type="checkbox"
                            checked={settings.notificationPreferences.newsletterSubscription}
                            onChange={() => handleCheckboxChange('notificationPreferences', 'newsletterSubscription')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newsletterSubscription" className="font-medium text-gray-700">
                            Newsletter Subscription
                          </label>
                          <p className="text-gray-500">Receive our weekly newsletter with the best content.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="commentReplies"
                            name="commentReplies"
                            type="checkbox"
                            checked={settings.notificationPreferences.commentReplies}
                            onChange={() => handleCheckboxChange('notificationPreferences', 'commentReplies')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="commentReplies" className="font-medium text-gray-700">
                            Comment Replies
                          </label>
                          <p className="text-gray-500">Get notified when someone replies to your comments.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newFollowers"
                            name="newFollowers"
                            type="checkbox"
                            checked={settings.notificationPreferences.newFollowers}
                            onChange={() => handleCheckboxChange('notificationPreferences', 'newFollowers')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newFollowers" className="font-medium text-gray-700">
                            New Followers
                          </label>
                          <p className="text-gray-500">Get notified when someone follows you.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700">
                          Profile Visibility
                        </label>
                        <select
                          id="profileVisibility"
                          name="profileVisibility"
                          value={settings.privacySettings.profileVisibility}
                          onChange={(e) => handleSelectChange('privacySettings', 'profileVisibility', e.target.value)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="public">Public - Anyone can view your profile</option>
                          <option value="private">Private - Only you can view your profile</option>
                          <option value="followers">Followers Only - Only followers can view your profile</option>
                        </select>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="showEmail"
                            name="showEmail"
                            type="checkbox"
                            checked={settings.privacySettings.showEmail}
                            onChange={() => handleCheckboxChange('privacySettings', 'showEmail')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="showEmail" className="font-medium text-gray-700">
                            Show Email
                          </label>
                          <p className="text-gray-500">Display your email address on your public profile.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="allowComments"
                            name="allowComments"
                            type="checkbox"
                            checked={settings.privacySettings.allowComments}
                            onChange={() => handleCheckboxChange('privacySettings', 'allowComments')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="allowComments" className="font-medium text-gray-700">
                            Allow Comments
                          </label>
                          <p className="text-gray-500">Allow others to comment on your posts.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="allowSharing"
                            name="allowSharing"
                            type="checkbox"
                            checked={settings.privacySettings.allowSharing}
                            onChange={() => handleCheckboxChange('privacySettings', 'allowSharing')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="allowSharing" className="font-medium text-gray-700">
                            Allow Sharing
                          </label>
                          <p className="text-gray-500">Allow others to share your posts on social media.</p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <h4 className="text-md font-medium text-gray-900">Security Options</h4>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Change Password
                          </button>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Enable Two-Factor Authentication
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

      {/* Appearance Settings */}
      {activeTab === 'appearance' && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Appearance Settings</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={settings.appearanceSettings.theme}
                onChange={(e) => handleSelectChange('appearanceSettings', 'theme', e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="system">System Preference</option>
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>

            <div>
              <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
                Font Size
              </label>
              <select
                id="fontSize"
                name="fontSize"
                value={settings.appearanceSettings.fontSize}
                onChange={(e) => handleSelectChange('appearanceSettings', 'fontSize', e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="compactView"
                  name="compactView"
                  type="checkbox"
                  checked={settings.appearanceSettings.compactView}
                  onChange={() => handleCheckboxChange('appearanceSettings', 'compactView')}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="compactView" className="font-medium text-gray-700">
                  Compact View
                </label>
                <p className="text-gray-500">Enable more compact layout for content lists</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Preferences */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Content Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Categories
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`${
                      settings.contentPreferences.categories.includes(category)
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    } rounded-md px-3 py-2 text-sm font-medium transition-colors`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Preferred Language
              </label>
              <select
                id="language"
                name="language"
                value={settings.contentPreferences.language}
                onChange={(e) => handleSelectChange('contentPreferences', 'language', e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Save button and footer */}
      <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-between">
        <div>
          {saveMessage && (
            <p className={`text-sm ${saveMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {saveMessage}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={saveSettings}
          disabled={isSaving}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
  </div>
  </div>
  </div>
  </div>
  </div>
  );
}