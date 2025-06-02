
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import ProductComparison from "@/components/ProductComparison";
import { toast } from "sonner";

const ProductComparisonPage = () => {
  // Mock comparison products - in real app this would come from context/state management
  const [comparisonProducts, setComparisonProducts] = useState([
    {
      id: 1,
      name: "Professional Power Rack",
      price: 899,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop",
      rating: 5,
      category: "Strength Training",
      features: [
        "Commercial-grade steel construction",
        "Multiple pull-up bar positions",
        "Adjustable safety bars",
        "Weight plate storage pegs"
      ],
      specifications: {
        "Dimensions": "84\" H x 48\" W x 48\" D",
        "Weight": "285 lbs",
        "Max Load": "1000 lbs"
      }
    },
    {
      id: 2,
      name: "Olympic Barbell Set",
      price: 299,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      rating: 4,
      category: "Free Weights",
      features: [
        "Olympic standard 45lb barbell",
        "Knurled grip for secure hold",
        "Chrome finish for durability",
        "Includes weight plates"
      ],
      specifications: {
        "Length": "7 feet",
        "Weight": "45 lbs",
        "Diameter": "2 inches"
      }
    }
  ]);

  const handleRemoveProduct = (productId: number) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId));
    toast.success("Product removed from comparison");
  };

  const handleAddToCart = (productId: number) => {
    const product = comparisonProducts.find(p => p.id === productId);
    if (product) {
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Compare Products</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Compare features, specifications, and prices to find the perfect equipment for your needs
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/products" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>

          <Link to="/products">
            <Button className="bg-primary-600 hover:bg-primary-700">
              <Plus className="h-4 w-4 mr-2" />
              Add More Products
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <ProductComparison
            products={comparisonProducts}
            onRemoveProduct={handleRemoveProduct}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductComparisonPage;
