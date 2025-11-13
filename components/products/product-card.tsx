"use client"

import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  id: string
  title: string
  price: number
  image: string
  category: string
  currency: string
}

export default function ProductCard({ id, title, price, image, category, currency }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors group cursor-pointer">
        <div className="relative w-full aspect-square bg-secondary overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-2">{category}</p>
          <h3 className="font-medium text-foreground truncate mb-3">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-primary">
              {currency} {price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
