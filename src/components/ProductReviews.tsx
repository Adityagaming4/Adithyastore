
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, ThumbsUp, Camera } from "lucide-react";
import { toast } from "sonner";

interface ProductReviewsProps {
  productId: number;
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 1,
      userName: "Mike Johnson",
      rating: 5,
      title: "Excellent build quality!",
      comment: "This power rack exceeded my expectations. The steel is heavy-duty and the assembly was straightforward. Perfect for my home gym setup.",
      date: "2024-05-15",
      verified: true,
      helpful: 12,
      images: ["https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=200&h=200&fit=crop"]
    },
    {
      id: 2,
      userName: "Sarah Davis",
      rating: 4,
      title: "Great value for money",
      comment: "Really solid piece of equipment. Assembly took about 3 hours but the instructions were clear. Only minor complaint is the pull-up bars could be slightly wider apart.",
      date: "2024-05-10",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      userName: "Tom Wilson",
      rating: 5,
      title: "Perfect for serious training",
      comment: "I've been using this for 6 months now and it's rock solid. Can handle heavy squats and deadlifts without any wobble. Highly recommended!",
      date: "2024-05-05",
      verified: true,
      helpful: 15,
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=200&h=200&fit=crop"
      ]
    }
  ];

  const handleSubmitReview = () => {
    if (!newRating || !reviewTitle || !reviewComment || !reviewerName) {
      toast.error("Please fill in all fields");
      return;
    }

    // Submit review logic here
    toast.success("Review submitted successfully!");
    setShowReviewForm(false);
    setNewRating(0);
    setReviewTitle("");
    setReviewComment("");
    setReviewerName("");
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 cursor-pointer transition-colors ${
          i < rating 
            ? "text-yellow-400 fill-current" 
            : interactive 
              ? "text-gray-300 hover:text-yellow-300" 
              : "text-gray-300"
        }`}
        onClick={() => interactive && onRate && onRate(i + 1)}
      />
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-gray-600">Based on {reviews.length} reviews</p>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter(r => r.rating === stars).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={stars} className="flex items-center space-x-2">
                    <span className="text-sm w-8">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Button */}
      <div className="text-center">
        <Button 
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-primary-600 hover:bg-primary-700"
        >
          Write a Review
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="reviewer-name">Your Name</Label>
              <Input
                id="reviewer-name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <Label>Rating</Label>
              <div className="flex space-x-1 mt-1">
                {renderStars(newRating, true, setNewRating)}
              </div>
            </div>

            <div>
              <Label htmlFor="review-title">Review Title</Label>
              <Input
                id="review-title"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Summarize your experience"
              />
            </div>

            <div>
              <Label htmlFor="review-comment">Your Review</Label>
              <Textarea
                id="review-comment"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Tell others about your experience with this product..."
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Add Photos
              </Button>
              <span className="text-sm text-gray-600">Optional</span>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleSubmitReview} className="bg-primary-600 hover:bg-primary-700">
                Submit Review
              </Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold">{review.userName}</span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4">{review.comment}</p>

              {review.images && (
                <div className="flex space-x-2 mb-4">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <button className="flex items-center space-x-1 hover:text-primary-600">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
