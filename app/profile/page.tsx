"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import SellerStats from "@/components/profile/seller-stats"
import UserProducts from "@/components/profile/user-products"

// Mock user data
const MOCK_USER = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  avatar: "/placeholder.svg?key=profile",
  bio: "Professional seller with 5+ years of experience. Fast shipping and quality products guaranteed!",
  joinDate: "January 2023",
  totalSales: 15430,
  totalProducts: 24,
  rating: 4.8,
  reviews: 156,
}

const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Wireless Headphones",
    price: 79.99,
    image: "/wireless-headphones.png",
    category: "Electronics",
    views: 234,
    active: true,
  },
  {
    id: "2",
    title: "Classic T-Shirt",
    price: 29.99,
    image: "/classic-tshirt.png",
    category: "Clothing",
    views: 156,
    active: true,
  },
  {
    id: "3",
    title: "Programming Book",
    price: 49.99,
    image: "/programming-book.png",
    category: "Books",
    views: 89,
    active: false,
  },
]

export default function ProfilePage() {
  const [user, setUser] = useState(MOCK_USER)
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [bio, setBio] = useState(user.bio)

  const handleSaveBio = () => {
    setUser({ ...user, bio })
    setIsEditingBio(false)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Commerce HUB
          </Link>
          <div className="flex gap-4">
            <Link href="/products" className="text-primary hover:text-accent transition-colors">
              Browse
            </Link>
            <button className="text-muted-foreground hover:text-foreground transition-colors">Logout</button>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* User Info Card */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Avatar & Basic Info */}
            <div className="md:col-span-1">
              <div className="w-32 h-32 rounded-lg bg-secondary mb-4 overflow-hidden mx-auto">
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-foreground text-center">{user.name}</h1>
              <p className="text-muted-foreground text-center text-sm mt-2">Joined {user.joinDate}</p>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">Email</label>
                  <p className="text-foreground">{user.email}</p>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">Phone</label>
                  <p className="text-foreground">{user.phone}</p>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Bio</label>
                {isEditingBio ? (
                  <div className="space-y-2">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="auth-input resize-none"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button onClick={handleSaveBio} className="auth-button py-2 px-4 max-w-[100px]">
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingBio(false)
                          setBio(user.bio)
                        }}
                        className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <p className="text-foreground">{bio}</p>
                    <button
                      onClick={() => setIsEditingBio(true)}
                      className="text-primary hover:text-accent transition-colors text-sm"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <SellerStats
          totalSales={user.totalSales}
          totalProducts={user.totalProducts}
          rating={user.rating}
          reviews={user.reviews}
        />

        {/* Products Section */}
        <div className="mt-12">
          <UserProducts products={MOCK_PRODUCTS} />
        </div>

        {/* Account Settings Section */}
        <div className="mt-12 bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Account Settings</h2>
          <div className="space-y-4">
            <Link
              href="/profile/edit"
              className="block px-4 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              Edit Profile
            </Link>
            <Link
              href="/profile/security"
              className="block px-4 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              Security & Password
            </Link>
            <Link
              href="/profile/notifications"
              className="block px-4 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              Notification Preferences
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
