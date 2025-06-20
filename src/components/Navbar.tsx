import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white py-2 px-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4">
            <div className="bg-pink-500 rounded-full h-12 w-12 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                Amar
            </div>
            <div className="hidden md:block text-left">
                <span className="text-purple-800 font-bold text-xl leading-tight">Amar Bakery</span>
                <div className="text-xs text-pink-500 font-semibold">Sabor que enamora</div>
            </div>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <nav className="hidden md:flex">
            <ul className="flex space-x-4 text-xs uppercase font-medium">
              <li><a href="#" className="hover:text-purple-800 transition-colors">Pedidos Online</a></li>
              <li><a href="#" className="hover:text-purple-800 transition-colors">Catering Corporativo</a></li>
              <li><a href="#" className="hover:text-purple-800 transition-colors">Franquicias</a></li>
              <li><a href="#" className="hover:text-purple-800 transition-colors">Tarjetas Regalo</a></li>
              <li><a href="#" className="hover:text-purple-800 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-purple-800 transition-colors">Contacto</a></li>
            </ul>
          </nav>
        </div>
        
        <Link to="/cart" className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <span className="text-xs font-bold bg-purple-100 text-purple-800 rounded-full px-2 py-0.5">{totalItems}</span>
        </Link>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50 py-4 px-6 animate-in slide-in-from-top">
          <nav>
            <ul className="flex flex-col space-y-3 text-sm uppercase font-medium">
              <li><a href="#" className="block py-1 hover:text-purple-800 transition-colors">Pedidos Online</a></li>
              <li><a href="#" className="block py-1 hover:text-purple-800 transition-colors">Catering Corporativo</a></li>
              <li><a href="#" className="block py-1 hover:text-purple-800 transition-colors">Franquicias</a></li>
              <li><a href="#" className="block py-1 hover:text-purple-800 transition-colors">Tarjetas Regalo</a></li>
              <li><a href="#" className="block py-1 hover:text-purple-800 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="block py-1 hover:text-purple-800 transition-colors">Contacto</a></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}