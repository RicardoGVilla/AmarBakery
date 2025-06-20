import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCartDispatch } from "../CartContext";

interface CookieProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  isVegan?: boolean;
}

export function CookieProducts() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useCartDispatch();
  
  const cookies: CookieProduct[] = [
    {
      id: 1,
      name: "Chocolate y Nueces",
      price: "$5.00",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Galleta Tarta de Cumpleaños",
      price: "$5.00",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Chocoadicto",
      price: "$5.00",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Chocoadicto Rellena de Nutella",
      price: "$5.50",
      image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      name: "M&M's y Chispas de Chocolate",
      price: "$5.50",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Chispas de Chocolate Vegana",
      price: "$5.50",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
      isVegan: true
    },
    {
      id: 7,
      name: "Nube de Malvavisco",
      price: "$5.00",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop"
    },
    {
      id: 8,
      name: "Galleta Red Velvet",
      price: "$5.50",
      image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&h=200&fit=crop"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleAddToCart = (cookie: Omit<CookieProduct, 'isVegan'>) => {
    dispatch({ type: 'ADD_ITEM', item: { id: cookie.id, name: cookie.name, price: cookie.price, image: cookie.image } });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <section className="py-8 px-4 bg-gray-50">
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50 animate-bounce">
          Añadido al carrito
        </div>
      )}
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 text-purple-800">Nuestras Galletas</h2>
        <p className="text-center text-gray-600 mb-6">Descubre la variedad de galletas artesanales que Amar Bakery tiene para ti. ¡Perfectas para cualquier ocasión!</p>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {cookies.map((cookie) => (
            <motion.div 
              key={cookie.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm transform transition-all duration-300"
              style={{ 
                transform: hoveredId === cookie.id ? 'scale(1.05)' : 'scale(1)',
                zIndex: hoveredId === cookie.id ? 10 : 1
              }}
              onMouseEnter={() => setHoveredId(cookie.id)}
              onMouseLeave={() => setHoveredId(null)}
              variants={item}
              whileHover={{ 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div className="relative">
                <img 
                  src={cookie.image} 
                  alt={cookie.name} 
                  className="w-full h-32 object-cover transition-transform duration-500"
                  style={{ 
                    transform: hoveredId === cookie.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                {cookie.isVegan && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    VEGANA
                  </span>
                )}
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-medium">{cookie.name}</h3>
                <p className="font-bold mt-1">{cookie.price}</p>
                
                {hoveredId === cookie.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    <Button size="sm" className="w-full bg-purple-800 hover:bg-purple-900 text-xs" onClick={() => handleAddToCart(cookie)}>
                      Añadir
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-8">
          <Button className="bg-pink-500 hover:bg-pink-600 rounded-full uppercase transform transition-transform hover:scale-105">
            Pedir Online
          </Button>
        </div>
      </div>
    </section>
  );
}