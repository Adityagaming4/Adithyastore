
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
}

const ProductCard = ({ id, name, price, originalPrice, image, rating, category }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    toast.success(`${name} added to cart!`);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking like
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist");
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link to={`/product/${id}`} className="block">
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-sm font-semibold">
              -{discount}%
            </div>
          )}
          <button
            onClick={handleToggleLike}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
              isLiked ? "bg-primary-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
          
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all duration-300">
              <Button
                onClick={handleAddToCart}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Quick Add
              </Button>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="text-sm text-gray-500 mb-1">{category}</div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({rating})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary-600">${price}</span>
              {originalPrice && (
                <span className="text-gray-500 line-through">${originalPrice}</span>
              )}
            </div>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-primary-600 hover:bg-primary-700"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
