
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Star, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
  features: string[];
  specifications: Record<string, string>;
}

interface ProductComparisonProps {
  products: Product[];
  onRemoveProduct: (productId: number) => void;
  onAddToCart: (productId: number) => void;
}

const ProductComparison = ({ products, onRemoveProduct, onAddToCart }: ProductComparisonProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold mb-2">No products to compare</h3>
        <p className="text-gray-600">Add products to your comparison list to see them here</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
          {/* Header Row */}
          <div className="font-semibold text-lg p-4">Compare Products</div>
          {products.map((product) => (
            <Card key={product.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10"
                onClick={() => onRemoveProduct(product.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardHeader className="text-center pb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover mx-auto rounded-lg mb-2"
                />
                <CardTitle className="text-sm">{product.name}</CardTitle>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg font-bold text-primary-600">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}

          {/* Rating Row */}
          <div className="p-4 font-medium border-t">Rating</div>
          {products.map((product) => (
            <div key={`rating-${product.id}`} className="p-4 border-t">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm">{product.rating}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Category Row */}
          <div className="p-4 font-medium border-t">Category</div>
          {products.map((product) => (
            <div key={`category-${product.id}`} className="p-4 border-t">
              <Badge variant="secondary" className="w-full justify-center">
                {product.category}
              </Badge>
            </div>
          ))}

          {/* Features Rows */}
          {products[0]?.features && (
            <>
              <div className="p-4 font-medium border-t">Key Features</div>
              {products.map((product) => (
                <div key={`features-${product.id}`} className="p-4 border-t">
                  <ul className="space-y-1 text-sm">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}

          {/* Action Row */}
          <div className="p-4 font-medium border-t">Actions</div>
          {products.map((product) => (
            <div key={`actions-${product.id}`} className="p-4 border-t">
              <Button
                onClick={() => onAddToCart(product.id)}
                className="w-full bg-primary-600 hover:bg-primary-700"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
