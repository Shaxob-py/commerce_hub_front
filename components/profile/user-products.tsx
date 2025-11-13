"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface UserProduct {
  id: string
  title: string
  price: number
  image: string
  category: string
  views: number
  active: boolean
}

interface UserProductsProps {
  products: UserProduct[]
}

export default function UserProducts({ products }: UserProductsProps) {
  const [productList, setProductList] = useState(products)

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProductList(productList.filter((p) => p.id !== id))
    }
  }

  const handleToggleActive = (id: string) => {
    setProductList(productList.map((p) => (p.id === id ? { ...p, active: !p.active } : p)))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Your Products</h2>
        <Link href="/products/add" className="auth-button py-2 px-6 max-w-[150px]">
          Add Product
        </Link>
      </div>

      {productList.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground mb-4">You haven't listed any products yet</p>
          <Link href="/products/add" className="text-primary hover:text-accent transition-colors font-medium">
            Create your first listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productList.map((product) => (
            <div key={product.id} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="relative w-full aspect-square bg-secondary overflow-hidden">
                <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.active ? "bg-green-500/20 text-green-300" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-foreground truncate mb-2">{product.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{product.category}</p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-primary">${product.price}</span>
                  <span className="text-xs text-muted-foreground">{product.views} views</span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 px-3 py-2 text-center bg-primary text-primary-foreground text-sm rounded-lg hover:bg-accent transition-colors"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleToggleActive(product.id)}
                    className="flex-1 px-3 py-2 text-center border border-border text-foreground text-sm rounded-lg hover:bg-secondary transition-colors"
                  >
                    {product.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-3 py-2 text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/10 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
