"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import ProductMap from "@/components/map/product-map"
import ProductReviews from "@/components/products/product-reviews"

// Mock product data — replace with API call later
const MOCK_PRODUCT = {
  id: "1",
  title: "Wireless Headphones Pro",
  price: 79.99,
  currency: "USD",
  rating: 4.5,
  image: "/wireless-headphones.png",
  category: "Electronics",
  description:
    "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
  seller: {
    name: "TechStore123",
    rating: 4.8,
    reviews: 256,
  },
  location: {
    latitude: 41.2995,
    longitude: 69.2401,
    address: "Tashkent, Uzbekistan",
  },
  specifications: [
    { label: "Driver Size", value: "40mm" },
    { label: "Frequency Response", value: "20Hz - 20kHz" },
    { label: "Battery Life", value: "30 hours" },
    { label: "Weight", value: "250g" },
    { label: "Connectivity", value: "Bluetooth 5.0" },
  ],
  reviews: [
    {
      id: "1",
      author: "John Doe",
      rating: 5,
      comment: "Excellent quality and fast shipping!",
      date: "2 days ago",
    },
    {
      id: "2",
      author: "Jane Smith",
      rating: 4,
      comment: "Good product, slightly pricey but worth it.",
      date: "1 week ago",
    },
    {
      id: "3",
      author: "Mike Johnson",
      rating: 5,
      comment: "Best headphones I have ever owned. Highly recommended!",
      date: "2 weeks ago",
    },
  ],
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const product = MOCK_PRODUCT // In production, fetch by params.id

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`)
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
              Back to Products
            </Link>
          </div>
        </div>
      </nav>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-card border border-border rounded-lg p-4 h-fit">
            <div className="relative w-full aspect-square bg-secondary rounded-lg overflow-hidden">
              <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < Math.round(product.rating) ? "text-primary" : "text-muted"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviews.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-primary mb-6">
                {product.currency} {product.price.toLocaleString()}
              </div>

              {/* Seller Info */}
              <div className="bg-secondary border border-border rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">Seller</p>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/sellers/${product.seller.name}`}
                    className="font-medium text-primary hover:text-accent transition-colors"
                  >
                    {product.seller.name}
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {product.seller.rating} ({product.seller.reviews})
                    </span>
                    <span className="text-primary">★</span>
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-3 bg-secondary border border-border rounded-lg px-4 py-2 w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-primary hover:text-accent transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-primary hover:text-accent transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button onClick={handleAddToCart} className="auth-button">
                  Add to Cart
                </button>

                <button className="w-full px-4 py-2.5 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">About This Product</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Specifications</h3>
            <div className="space-y-3">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between border-b border-border pb-3 last:border-0">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium text-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="bg-card border border-border rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold text-foreground mb-4">Product Location</h3>
            <p className="text-sm text-muted-foreground mb-4">{product.location.address}</p>
            <ProductMap
              latitude={product.location.latitude}
              longitude={product.location.longitude}
              title={product.title}
            />
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <ProductReviews reviews={product.reviews} />
        </div>
      </div>
    </main>
  )
}
