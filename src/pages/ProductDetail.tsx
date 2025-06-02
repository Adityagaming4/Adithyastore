
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Upload, 
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";
import ProductReviews from "@/components/ProductReviews";
import ProductImageGallery from "@/components/ProductImageGallery";

const ProductDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app this would come from API
  const product = {
    id: parseInt(id || "1"),
    name: "Professional Power Rack",
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 127,
    category: "Strength Training",
    brand: "FitHaven Pro",
    sku: "FH-PR-001",
    description: "Built with commercial-grade steel, this power rack is designed for serious strength training. Features multiple pull-up bar positions, safety bars, and weight plate storage.",
    features: [
      "Commercial-grade steel construction",
      "Multiple pull-up bar positions",
      "Adjustable safety bars",
      "Weight plate storage pegs",
      "Non-slip rubber feet",
      "Quick-lock pin system"
    ],
    specifications: {
      "Dimensions": "84\" H x 48\" W x 48\" D",
      "Weight": "285 lbs",
      "Max Load": "1000 lbs",
      "Material": "14-gauge steel",
      "Finish": "Powder-coated black",
      "Assembly": "Required (2-3 hours)"
    },
    images: [
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&h=600&fit=crop"
    ],
    inStock: true,
    stockCount: 12
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    // Buy now logic here
    toast.success("Redirecting to checkout...");
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist");
  };

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/products" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">by {product.brand} • SKU: {product.sku}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary-600">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <Badge className="bg-primary-600 text-white">-{discount}% OFF</Badge>
                  </>
                )}
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                    <span>In Stock ({product.stockCount} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <label className="font-semibold">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleBuyNow} 
                    size="lg" 
                    className="flex-1 bg-primary-600 hover:bg-primary-700"
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </Button>
                  <Button 
                    onClick={handleAddToCart} 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
                
                <Button 
                  onClick={handleToggleLike} 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                >
                  <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`} />
                  {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Features */}
              <div className="pt-6">
                <h3 className="font-semibold mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Truck className="h-8 w-8 text-primary-600 mb-2" />
                    <span className="text-sm font-medium">Free Shipping</span>
                    <span className="text-xs text-gray-600">Orders over $500</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Shield className="h-8 w-8 text-primary-600 mb-2" />
                    <span className="text-sm font-medium">2-Year Warranty</span>
                    <span className="text-xs text-gray-600">Full coverage</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw className="h-8 w-8 text-primary-600 mb-2" />
                    <span className="text-sm font-medium">30-Day Returns</span>
                    <span className="text-xs text-gray-600">Hassle-free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="photos">Customer Photos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium text-gray-600">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <ProductReviews productId={product.id} />
          </TabsContent>
          
          <TabsContent value="photos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-${1534258936925 + i}?w=200&h=200&fit=crop`}
                        alt={`Customer photo ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Your Photo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
