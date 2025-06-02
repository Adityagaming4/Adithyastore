
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Dumbbell, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <Dumbbell className="h-8 w-8 text-primary-600" />
            <span>FitHaven</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors duration-300 hover:text-primary-600 ${
                  isActive(item.path) ? "text-primary-600" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className={`flex items-center space-x-1 transition-colors duration-300 hover:text-primary-600 ${
                isActive("/cart") ? "text-primary-600" : ""
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md transition-colors duration-300 hover:bg-gray-900 hover:text-primary-600 ${
                    isActive(item.path) ? "text-primary-600 bg-gray-900" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/cart"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300 hover:bg-gray-900 hover:text-primary-600 ${
                  isActive("/cart") ? "text-primary-600 bg-gray-900" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
