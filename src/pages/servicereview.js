'use client'

import { useState } from 'react'
import { Star, ThumbsUp, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"

// Placeholder data for reviews
const reviews = [
  { id: 1, user: 'Alice Johnson', avatar: '/avatar1.png', rating: 5, date: '2023-05-10', review: 'Excellent service! The cleaner was thorough and professional.', likes: 12, replies: 2 },
  { id: 2, user: 'Bob Smith', avatar: '/avatar2.png', rating: 4, date: '2023-05-09', review: 'Good job overall, but arrived a bit late.', likes: 8, replies: 1 },
  { id: 3, user: 'Charlie Brown', avatar: '/avatar3.png', rating: 5, date: '2023-05-08', review: 'Outstanding work! Will definitely use again.', likes: 15, replies: 3 },
]

export default function ServiceReviews() {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 0, review: '' })

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            onClick={() => onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const ReviewCard = ({ review }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={review.avatar} alt={review.user} />
            <AvatarFallback>{review.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{review.user}</CardTitle>
            <CardDescription>{review.date}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <StarRating rating={review.rating} />
          <span className="text-sm text-gray-500">{review.rating.toFixed(1)}</span>
        </div>
        <p>{review.review}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <ThumbsUp className="w-4 h-4 mr-2" />
          {review.likes}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageSquare className="w-4 h-4 mr-2" />
          {review.replies}
        </Button>
      </CardFooter>
    </Card>
  )

  const handleSubmitReview = (e) => {
    e.preventDefault()
    // Here you would typically send the review to your backend
    console.log('Submitting review:', newReview)
    setShowReviewForm(false)
    setNewReview({ rating: 0, review: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Service Reviews</h1>
        <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
          <DialogTrigger asChild>
            <Button>Write a Review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write Your Review</DialogTitle>
              <DialogDescription>Share your experience with this service</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitReview}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <StarRating
                    rating={newReview.rating}
                    onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
                  />
                </div>
                <div>
                  <Label htmlFor="review">Your Review</Label>
                  <Textarea
                    id="review"
                    placeholder="Write your review here..."
                    value={newReview.review}
                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit">Submit Review</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Overall Rating</h2>
        <div className="flex items-center space-x-4">
          <StarRating rating={4.5} />
          <span className="text-3xl font-bold">4.5</span>
          <span className="text-gray-500">({reviews.length} reviews)</span>
        </div>
      </div>
    </div>
  )
}