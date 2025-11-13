"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import ProductFilters from "@/components/products/product-filters"
import ProductsGrid from "@/components/products/products-grid"

// Mock data - replace with API call
const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Wireless Headphones",
    price: 79.99,
    image: "/wireless-headphones.png",
    category: "Electronics",
  },
  {
    id: "2",
    title: "Classic T-Shirt",
    price: 29.99,
    image: "/classic-tshirt.png",
    category: "Clothing",
  },
  {
    id: "3",
    title: "Programming Book",
    price: 49.99,
    image: "/programming-book.png",
    category: "Books",
  },
  {
    id: "4",
    title: "Desk Lamp",
    price: 45.99,
    image: "/modern-desk-lamp.png",
    category: "Home",
  },
  {
    id: "5",
    title: "Running Shoes",
    price: 89.99,
    image: "/running-shoes.jpg",
    category: "Sports",
  },
  {
    id: "6",
    title: "Face Cream",
    price: 34.99,
    image: "/face-cream-display.png",
    category: "Beauty",
  },
  {
    id: "7",
    title: "Action Figure",
    price: 24.99,
    image: "/action-figure.png",
    category: "Toys",
  },
  {
    id: "8",
    title: "Coffee Beans",
    price: 12.99,
    image: "/pile-of-coffee-beans.png",
    category: "Food",
  },
]

const CURRENCY_RATES: Record<string, number> = {
  USD: 1,
  SUM: 10920,
  RUB: 98.5,
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    }).map((product) => ({
      ...product,
      price: Math.round(product.price * CURRENCY_RATES[selectedCurrency] * 100) / 100,
    }))
  }, [searchTerm, selectedCategory, selectedCurrency])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Commerce HUB
          </Link>
          <div className="flex gap-4">
            <Link href="/products/add" className="auth-button py-2 px-6 max-w-[150px]">
              Sell Item
            </Link>
            <Link href="/profile" className="text-primary hover:text-accent transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Browse and discover amazing products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <ProductFilters
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onCurrencyChange={setSelectedCurrency}
            selectedCategory={selectedCategory}
            selectedCurrency={selectedCurrency}
          />

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
            </div>
            <ProductsGrid products={filteredProducts} currency={selectedCurrency} />
          </div>
        </div>
      </div>
    </main>
  )
}
