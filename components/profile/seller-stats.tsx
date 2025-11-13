"use client"

interface SellerStatsProps {
  totalSales: number
  totalProducts: number
  rating: number
  reviews: number
}

export default function SellerStats({ totalSales, totalProducts, rating, reviews }: SellerStatsProps) {
  const stats = [
    { label: "Total Sales", value: `$${totalSales.toLocaleString()}`, icon: "💰" },
    { label: "Products Listed", value: totalProducts, icon: "📦" },
    { label: "Rating", value: `${rating}/5`, icon: "⭐" },
    { label: "Reviews", value: reviews, icon: "💬" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
