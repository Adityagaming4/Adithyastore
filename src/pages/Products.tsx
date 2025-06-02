import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductQuickView from "@/components/ProductQuickView";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, GitCompare } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [comparisonList, setComparisonList] = useState([]);

  const products = [
    {
      id: 1,
      name: "Professional Power Rack",
      price: 899,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop",
      rating: 5,
      category: "Strength Training",
      description: "Built with commercial-grade steel, this power rack is designed for serious strength training.",
      features: [
        "Commercial-grade steel construction",
        "Multiple pull-up bar positions",
        "Adjustable safety bars",
        "Weight plate storage pegs"
      ]
    },
    {
      id: 2,
      name: "Olympic Barbell Set",
      price: 299,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      rating: 4,
      category: "Free Weights",
      description: "Professional Olympic barbell set with premium weight plates.",
      features: [
        "Olympic standard 45lb barbell",
        "Knurled grip for secure hold",
        "Chrome finish for durability",
        "Includes weight plates"
      ]
    },
    {
      id: 3,
      name: "Commercial Treadmill",
      price: 2499,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop",
      rating: 5,
      category: "Cardio",
      description: "Commercial-grade treadmill with advanced features and durability.",
      features: [
        "3.5 HP continuous duty motor",
        "22\" x 60\" running surface",
        "15% incline capability",
        "Heart rate monitoring"
      ]
    },
    {
      id: 4,
      name: "Adjustable Dumbbells",
      price: 599,
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=300&fit=crop",
      rating: 4,
      category: "Free Weights"
    },
    {
      id: 5,
      name: "Cable Machine System",
      price: 1299,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
      rating: 5,
      category: "Strength Training"
    },
    {
      id: 6,
      name: "Exercise Bike Pro",
      price: 799,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      rating: 4,
      category: "Cardio"
    },
    {
      id: 7,
      name: "Kettlebell Set",
      price: 199,
      image: "https://images.unsplash.com/photo-1606889464198-fcb18894cf75?w=400&h=300&fit=crop",
      rating: 5,
      category: "Free Weights"
    },
    {
      id: 8,
      name: "Multi-Station Gym",
      price: 1899,
      image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=300&fit=crop",
      rating: 5,
      category: "Strength Training"
    }
  ];

  const categories = ["all", "Cardio", "Strength Training", "Free Weights"];

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === "all" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleAddToComparison = (product) => {
    if (comparisonList.length >= 4) {
      toast.error("You can only compare up to 4 products");
      return;
    }
    
    if (comparisonList.find(p => p.id === product.id)) {
      toast.error("Product is already in comparison list");
      return;
    }

    setComparisonList(prev => [...prev, product]);
    toast.success(`${product.name} added to comparison list`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional-grade gym equipment for every fitness goal and budget
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {comparisonList.length > 0 && (
                <Link to="/compare">
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    <GitCompare className="h-4 w-4 mr-2" />
                    Compare ({comparisonList.length})
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard {...product} />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickView(product)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddToComparison(product)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <GitCompare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Products;
