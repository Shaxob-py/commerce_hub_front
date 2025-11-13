"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import LocationPicker from "./location-picker"

const CATEGORIES = ["Electronics", "Clothing", "Books", "Home", "Sports", "Beauty", "Toys", "Food"]

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Electronics",
    price: "",
    currency: "USD",
    condition: "new",
    image: "",
  })

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setLocation({ latitude: lat, longitude: lng, address })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.title || !formData.price || !location.address) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      // TODO: Implement API call to create product
      console.log("Create product:", {
        ...formData,
        ...location,
      })
      setSuccess(true)
    } catch (err) {
      setError("Failed to create product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4 py-12">
        <div className="text-green-400 text-lg font-medium">Product listed successfully!</div>
        <p className="text-muted-foreground">Your product is now visible to all buyers</p>
        <Link href="/profile" className="auth-link inline-block mt-4">
          Go to my profile
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Product Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Product Title *
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Wireless Headphones"
              className="auth-input"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your product..."
              className="auth-input resize-none"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="auth-input"
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium mb-2">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="auth-input"
              >
                <option value="new">New</option>
                <option value="like_new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-2">
              Price *
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              className="auth-input"
              required
            />
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium mb-2">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="auth-input"
            >
              <option value="USD">USD</option>
              <option value="SUM">SUM</option>
              <option value="RUB">RUB</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Product Location *</h2>
        <LocationPicker onLocationSelect={handleLocationSelect} />
      </div>

      {/* Image Upload */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Product Image</h2>
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
            <input
              id="image"
              type="file"
              name="image"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  console.log("File selected:", e.target.files[0])
                }
              }}
              className="hidden"
              accept="image/*"
            />
            <label htmlFor="image" className="cursor-pointer">
              <p className="text-foreground font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4">{error}</div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="auth-button flex-1">
          {loading ? "Creating Product..." : "Create Product"}
        </button>
        <Link
          href="/profile"
          className="flex-1 px-4 py-2.5 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors text-center font-medium"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
