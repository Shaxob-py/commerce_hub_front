"use client"

import type React from "react"

import { useState } from "react"

const CATEGORIES = ["Electronics", "Clothing", "Books", "Home", "Sports", "Beauty", "Toys", "Food"]
const CURRENCIES = ["USD", "SUM", "RUB"]

interface ProductFiltersProps {
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string) => void
  onCurrencyChange: (currency: string) => void
  selectedCategory: string
  selectedCurrency: string
}

export default function ProductFilters({
  onSearchChange,
  onCategoryChange,
  onCurrencyChange,
  selectedCategory,
  selectedCurrency,
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearchChange(value)
  }

  return (
    <aside className="w-full lg:w-64 space-y-6">
      {/* Search */}
      <div className="bg-card border border-border rounded-lg p-4">
        <label htmlFor="search" className="block text-sm font-medium mb-3">
          Search Products
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="auth-input"
        />
      </div>

      {/* Categories */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange("")}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === "" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Currency */}
      <div className="bg-card border border-border rounded-lg p-4">
        <label htmlFor="currency" className="block text-sm font-medium mb-3">
          Currency
        </label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="auth-input"
        >
          {CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </aside>
  )
}
