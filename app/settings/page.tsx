"use client"
// pages/settings.tsx
import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Moon, Sun, User, Bell, Lock, Palette, Layers } from "lucide-react"

// Define types for our settings
interface UserSettings {
  displayName: string
  email: string
  bio: string
  profilePicture: string
  notificationPreferences: {
    emailNotifications: boolean
    pushNotifications: boolean
    newsletterSubscription: boolean
    commentReplies: boolean
    newFollowers: boolean
  }
  privacySettings: {
    profileVisibility: "public" | "private" | "followers"
    showEmail: boolean
    allowComments: boolean
    allowSharing: boolean
  }
  appearanceSettings: {
    theme: "light" | "dark" | "system"
    fontSize: "small" | "medium" | "large"
    compactView: boolean
  }
  contentPreferences: {
    categories: string[]
    language: string
  }
}

// Mock data for available categories and languages
const availableCategories = [
  "Technology",
  "Travel",
  "Food",
  "Fashion",
  "Health",
  "Fitness",
  "Business",
  "Finance",
  "Art",
  "Science",
]

const availableLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
]

export default function Settings() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  // Initialize with default settings
  const [settings, setSettings] = useState<UserSettings>({
    displayName: "John Doe",
    email: "johndoe@example.com",
    bio: "I love writing about technology and travel.",
    profilePicture: "/default-avatar.png",
    notificationPreferences: {
      emailNotifications: true,
      pushNotifications: true,
      newsletterSubscription: true,
      commentReplies: true,
      newFollowers: true,
    },
    privacySettings: {
      profileVisibility: "public",
      showEmail: false,
      allowComments: true,
      allowSharing: true,
    },
    appearanceSettings: {
      theme: "system",
      fontSize: "medium",
      compactView: false,
    },
    contentPreferences: {
      categories: ["Technology", "Travel"],
      language: "en",
    },
  })

  // Effect to update theme when settings change
  useEffect(() => {
    setTheme(settings.appearanceSettings.theme)

    // Apply theme to document
    if (settings.appearanceSettings.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (settings.appearanceSettings.theme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      // System preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [settings.appearanceSettings.theme])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

  // Handle checkbox changes
  const handleCheckboxChange = (section: string, setting: string) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof UserSettings],
        [setting]: !(settings[section as keyof UserSettings] as any)[setting],
      },
    })
  }

  // Handle nested select changes
  const handleSelectChange = (section: string, setting: string, value: any) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof UserSettings],
        [setting]: value,
      },
    })
  }

  // Handle category selection
  const handleCategoryToggle = (category: string) => {
    const currentCategories = settings.contentPreferences.categories
    let newCategories

    if (currentCategories.includes(category)) {
      newCategories = currentCategories.filter((c) => c !== category)
    } else {
      newCategories = [...currentCategories, category]
    }

    setSettings({
      ...settings,
      contentPreferences: {
        ...settings.contentPreferences,
        categories: newCategories,
      },
    })
  }

  // Handle file upload for profile picture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Save settings
  const saveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (imagePreview) {
        setSettings({
          ...settings,
          profilePicture: imagePreview,
        })
      }
      setSaveMessage("Settings saved successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      setSaveMessage("Error saving settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Settings content */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white">Settings</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage your account settings and preferences.
              </p>

              {/* Settings navigation */}
              <nav className="mt-8 space-y-2" aria-label="Settings">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`${
                    activeTab === "profile"
                      ? "bg-cyan-50 dark:bg-[#00e5FF]/10 border-[#00e5FF] text-[#00e5FF] dark:text-[#00e5FF]"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  } flex items-center px-4 py-3 text-sm font-medium border-l-4 w-full text-left rounded-r-md transition-all duration-200`}
                >
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </button>

                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`${
                    activeTab === "notifications"
                      ? "bg-cyan-50 dark:bg-[#00e5FF]/10 border-[#00e5FF] text-[#00e5FF] dark:text-[#00e5FF]"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  } flex items-center px-4 py-3 text-sm font-medium border-l-4 w-full text-left rounded-r-md transition-all duration-200`}
                >
                  <Bell className="mr-3 h-5 w-5" />
                  Notifications
                </button>

                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`${
                    activeTab === "privacy"
                      ? "bg-cyan-50 dark:bg-[#00e5FF]/10 border-[#00e5FF] text-[#00e5FF] dark:text-[#00e5FF]"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  } flex items-center px-4 py-3 text-sm font-medium border-l-4 w-full text-left rounded-r-md transition-all duration-200`}
                >
                  <Lock className="mr-3 h-5 w-5" />
                  Privacy & Security
                </button>

                <button
                  onClick={() => setActiveTab("appearance")}
                  className={`${
                    activeTab === "appearance"
                      ? "bg-cyan-50 dark:bg-[#00e5FF]/10 border-[#00e5FF] text-[#00e5FF] dark:text-[#00e5FF]"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  } flex items-center px-4 py-3 text-sm font-medium border-l-4 w-full text-left rounded-r-md transition-all duration-200`}
                >
                  <Palette className="mr-3 h-5 w-5" />
                  Appearance
                </button>

                <button
                  onClick={() => setActiveTab("content")}
                  className={`${
                    activeTab === "content"
                      ? "bg-cyan-50 dark:bg-[#00e5FF]/10 border-[#00e5FF] text-[#00e5FF] dark:text-[#00e5FF]"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  } flex items-center px-4 py-3 text-sm font-medium border-l-4 w-full text-left rounded-r-md transition-all duration-200`}
                >
                  <Layers className="mr-3 h-5 w-5" />
                  Content Preferences
                </button>
              </nav>
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:col-span-2">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <div className="px-6 py-6 bg-white dark:bg-[#0a0a0a] sm:p-6 rounded-xl">
                {/* Profile Settings */}
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">
                      Profile Information
                    </h3>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="displayName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Display Name
                        </label>
                        <input
                          type="text"
                          name="displayName"
                          id="displayName"
                          value={settings.displayName}
                          onChange={handleInputChange}
                          className="px-4 py-2.5 mt-1 focus:ring-[#00e5FF] focus:border-[#00e5FF] block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={settings.email}
                          onChange={handleInputChange}
                          className="px-4 py-2.5 mt-1 focus:ring-[#00e5FF] focus:border-[#00e5FF] block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="bio"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          rows={3}
                          value={settings.bio}
                          onChange={handleInputChange}
                          className="px-4 py-2.5 mt-1 focus:ring-[#00e5FF] focus:border-[#00e5FF] block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Brief description for your profile. URLs are hyperlinked.
                        </p>
                      </div>

                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Profile Picture
                        </label>
                        <div className="mt-2 flex items-center space-x-5">
                          <div className="flex-shrink-0">
                            <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-600 shadow-sm">
                              {imagePreview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={imagePreview || "/placeholder.svg"}
                                  alt="Profile preview"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-[#00e5FF] dark:text-[#00e5FF] text-xl font-bold">
                                  {settings.displayName.charAt(0)}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <label
                              htmlFor="profile-photo"
                              className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-[#00e5FF] dark:text-[#00e5FF] hover:text-[#00e5FF]/80 dark:hover:text-[#00e5FF]/80 focus-within:outline-none px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm transition-colors"
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
                            <p className="pl-3 self-center">or drag and drop</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">
                      Notification Preferences
                    </h3>
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="emailNotifications"
                            name="emailNotifications"
                            type="checkbox"
                            checked={settings.notificationPreferences.emailNotifications}
                            onChange={() => handleCheckboxChange("notificationPreferences", "emailNotifications")}
                            className="focus:ring-[#00e5FF] h-5 w-5 text-[#00e5FF] border-gray-300 dark:border-gray-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="emailNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                            Email Notifications
                          </label>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Receive email notifications for important updates.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="pushNotifications"
                            name="pushNotifications"
                            type="checkbox"
                            checked={settings.notificationPreferences.pushNotifications}
                            onChange={() => handleCheckboxChange("notificationPreferences", "pushNotifications")}
                            className="focus:ring-[#00e5FF] h-5 w-5 text-[#00e5FF] border-gray-300 dark:border-gray-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="pushNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                            Push Notifications
                          </label>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">Allow browser push notifications.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newsletterSubscription"
                            name="newsletterSubscription"
                            type="checkbox"
                            checked={settings.notificationPreferences.newsletterSubscription}
                            onChange={() => handleCheckboxChange("notificationPreferences", "newsletterSubscription")}
                            className="focus:ring-[#00e5FF] h-5 w-5 text-[#00e5FF] border-gray-300 dark:border-gray-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="newsletterSubscription"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            Newsletter Subscription
                          </label>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Receive our weekly newsletter with the best content.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="commentReplies"
                            name="commentReplies"
                            type="checkbox"
                            checked={settings.notificationPreferences.commentReplies}
                            onChange={() => handleCheckboxChange("notificationPreferences", "commentReplies")}
                            className="focus:ring-[#00e5FF] h-5 w-5 text-[#00e5FF] border-gray-300 dark:border-gray-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="commentReplies" className="font-medium text-gray-700 dark:text-gray-300">
                            Comment Replies
                          </label>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Get notified when someone replies to your comments.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newFollowers"
                            name="newFollowers"
                            type="checkbox"
                            checked={settings.notificationPreferences.newFollowers}
                            onChange={() => handleCheckboxChange("notificationPreferences", "newFollowers")}
                            className="focus:ring-[#00e5FF] h-5 w-5 text-[#00e5FF] border-gray-300 dark:border-gray-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newFollowers" className="font-medium text-gray-700 dark:text-gray-300">
                            New Followers
                          </label>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Get notified when someone follows you.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">Privacy Settings</h3>
                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="profileVisibility"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Profile Visibility
                        </label>
                        <select
                          id="profileVisibility"
                          name="profileVisibility"
                          value={settings.privacySettings.profileVisibility}
                          onChange={(e) => handleSelectChange("privacySettings", "profileVisibility", e.target.value)}
                          className="px-4 py-2.5 mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#00e5FF] focus:border-[#00e5FF] sm:text-sm text-gray-900 dark:text-white"
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
                            onChange={() => handleCheckboxChange("privacySettings", "showEmail")}
                            className="focus:ring-[#00e5FF] h-5 w-5 text-[#00e5FF] border-gray-300 dark:border-gray-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="showEmail" className="font-medium text-gray-700 dark:text-gray-300">
                            Show Email
                          </label>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Display your email address on your public profile.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="allowComments"
                            name="allowComments"
                            type="checkbox"
                            checked={settings.privacySettings.allowComments}
                            onChange={() => handleCheckboxChange("privacySettings", "allowComments")}
                            className="focus:ring-[#00e5FF] h-5 w-5 text-[#00e5FF] border-gray-300 dark:border-gray-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="allowComments" className="font-medium text-gray-700 dark:text-gray-300">
                            Allow Comments
                          </label>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Allow others to comment on your posts.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="allowSharing"
                            name="allowSharing"
                            type="checkbox"
                            checked={settings.privacySettings.allowSharing}
                            onChange={() => handleCheckboxChange("privacySettings", "allowSharing")}
                            className="focus:ring-[#00e5FF] h-5 w-5 text-[#00e5FF] border-gray-300 dark:border-gray-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="allowSharing" className="font-medium text-gray-700 dark:text-gray-300">
                            Allow Sharing
                          </label>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Allow others to share your posts on social media.
                          </p>
                        </div>
                      </div>

                      <div className="pt-5">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security Options</h4>
                        <div className="space-y-3">
                          <button
                            type="button"
                            className="inline-flex items-center px-5 py-2.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00e5FF] transition-colors"
                          >
                            Change Password
                          </button>
                          <button
                            type="button"
                            className="ml-2 inline-flex items-center px-5 py-2.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00e5FF] transition-colors"
                          >
                            Enable Two-Factor Authentication
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Settings */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">
                      Appearance Settings
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="theme"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Theme
                        </label>
                        <div className="mt-2 grid grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => handleSelectChange("appearanceSettings", "theme", "light")}
                            className={`relative px-4 py-3 flex items-center justify-center text-sm font-medium uppercase rounded-md border ${
                              settings.appearanceSettings.theme === "light"
                                ? "bg-cyan-50 dark:bg-[#00e5FF]/10 border-[#00e5FF] text-[#00e5FF] dark:text-[#00e5FF]"
                                : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                            } transition-colors`}
                          >
                            <Sun className="h-5 w-5 mr-2" />
                            Light
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectChange("appearanceSettings", "theme", "dark")}
                            className={`relative px-4 py-3 flex items-center justify-center text-sm font-medium uppercase rounded-md border ${
                              settings.appearanceSettings.theme === "dark"
                                ? "bg-cyan-50 dark:bg-[#00e5FF]/10 border-[#00e5FF] text-[#00e5FF] dark:text-[#00e5FF]"
                                : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                            } transition-colors`}
                          >
                            <Moon className="h-5 w-5 mr-2" />
                            Dark
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectChange("appearanceSettings", "theme", "system")}
                            className={`relative px-4 py-3 flex items-center justify-center text-sm font-medium uppercase rounded-md border ${
                              settings.appearanceSettings.theme === "system"
                                ? "bg-cyan-50 dark:bg-[#00e5FF]/10 border-[#00e5FF] text-[#00e5FF] dark:text-[#00e5FF]"
                                : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                            } transition-colors`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            System
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="fontSize"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Font Size
                        </label>
                        <select
                          id="fontSize"
                          name="fontSize"
                          value={settings.appearanceSettings.fontSize}
                          onChange={(e) => handleSelectChange("appearanceSettings", "fontSize", e.target.value)}
                          className="px-4 py-2.5 mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#00e5FF] focus:border-[#00e5FF] sm:text-sm text-gray-900 dark:text-white"
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
                            onChange={() => handleCheckboxChange("appearanceSettings", "compactView")}
                            className="focus:ring-[#00e5FF] h-5 w-5 text-[#00e5FF] border-gray-300 dark:border-gray-600 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="compactView" className="font-medium text-gray-700 dark:text-gray-300">
                            Compact View
                          </label>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Enable more compact layout for content lists
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content Preferences */}
                {activeTab === "content" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">
                      Content Preferences
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Preferred Categories
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {availableCategories.map((category) => (
                            <button
                              key={category}
                              type="button"
                              onClick={() => handleCategoryToggle(category)}
                              className={`${
                                settings.contentPreferences.categories.includes(category)
                                  ? "bg-[#00e5FF] dark:bg-[#00e5FF]/90 text-white dark:text-black hover:bg-[#00e5FF]/80 dark:hover:bg-[#00e5FF]"
                                  : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                              } rounded-md px-4 py-2.5 text-sm font-medium transition-colors`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="language"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Preferred Language
                        </label>
                        <select
                          id="language"
                          name="language"
                          value={settings.contentPreferences.language}
                          onChange={(e) => handleSelectChange("contentPreferences", "language", e.target.value)}
                          className="px-4 py-2.5 mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#00e5FF] focus:border-[#00e5FF] sm:text-sm text-gray-900 dark:text-white"
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
              </div>

              {/* Save button and footer */}
              <div className=" mt-2 px-6 py-4 bg-gray-50 dark:bg-[#0a0a0a] sm:px-6 flex justify-between items-center rounded-xl">
                <div>
                  {saveMessage && (
                    <p
                      className={`text-sm ${saveMessage.includes("success") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {saveMessage}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={saveSettings}
                  disabled={isSaving}
                  className="inline-flex justify-center py-2.5 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:text-black bg-[#00e5FF] hover:bg-[#00e5FF]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-[#00e5FF] disabled:opacity-50 transition-colors"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
