"use client"

import ProductCard from "./product-card"

interface Product {
  id: string
  title: string
  price: number
  image: string
  category: string
}

interface ProductsGridProps {
  products: Product[]
  currency: string
}

export default function ProductsGrid({ products, currency }: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-center">
        <div>
          <p className="text-muted-foreground text-lg">No products found</p>
          <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters or search</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          category={product.category}
          currency={currency}
        />
      ))}
    </div>
  )
}
