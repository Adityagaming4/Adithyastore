
import { Link } from "react-router-dom";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductShowcase = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Professional Power Rack",
      price: 899,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop",
      rating: 5,
      category: "Strength Training"
    },
    {
      id: 2,
      name: "Olympic Barbell Set",
      price: 299,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      rating: 4,
      category: "Free Weights"
    },
    {
      id: 3,
      name: "Commercial Treadmill",
      price: 2499,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop",
      rating: 5,
      category: "Cardio"
    },
    {
      id: 4,
      name: "Adjustable Dumbbells",
      price: 599,
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=300&fit=crop",
      rating: 4,
      category: "Free Weights"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our top-rated fitness equipment designed to help you achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => {
            const discount = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
              : 0;

            return (
              <Link key={product.id} to={`/product/${product.id}`} className="block group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {discount > 0 && (
                      <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-sm font-semibold">
                        -{discount}%
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button
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
          })}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button className="bg-primary-600 hover:bg-primary-700 text-lg px-8 py-3">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
