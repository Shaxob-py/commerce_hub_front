import Link from "next/link"
import AddProductForm from "@/components/products/add-product-form"

export default function AddProductPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Commerce HUB
          </Link>
          <Link href="/products" className="text-primary hover:text-accent transition-colors">
            Back to Products
          </Link>
        </div>
      </nav>

      {/* Add Product Form */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Add Product</h1>
          <p className="text-muted-foreground">List a new product on the marketplace</p>
        </div>

        <AddProductForm />
      </div>
    </main>
  )
}
