"use client"

interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

interface ProductReviewsProps {
  reviews: Review[]
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Customer Reviews</h3>

        {/* Rating Summary */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{averageRating}</div>
            <div className="flex gap-1 justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${i < Math.round(Number(averageRating)) ? "text-primary" : "text-muted"}`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">{reviews.length} reviews</p>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-foreground">{review.author}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < review.rating ? "text-primary" : "text-muted"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
