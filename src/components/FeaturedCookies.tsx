import { motion } from "framer-motion";
import { useRef } from "react";

interface FeaturedCookie {
  id: number;
  name: string;
  description: string;
  image: string;
}

export function FeaturedCookies() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const featuredCookies: FeaturedCookie[] = [
    {
      id: 1,
      name: "OREO CHOCOLATE",
      description: "Una galleta con trozos de Oreo, chocolate negro del bueno y un toque de sal marina que realza todos los sabores.",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "DOBLE CHOCOLATE",
      description: "Galleta de chocolate con trozos de chocolate. Nuestras galletas tienen el equilibrio perfecto entre textura y sabor del chocolate.",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "GALLETAS DE NUTELLA",
      description: "Deliciosas galletas con un centro cremoso de Nutella. El contraste entre la galleta crujiente y el relleno suave es irresistible.",
      image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "GALLETA RED VELVET",
      description: "Inspirada en el clásico Red Velvet, esta galleta combina el sabor característico con trozos de chocolate blanco.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      name: "GALLETAS BROWNIE",
      description: "La fusión perfecta de brownie y galleta. Estas galletas tienen la intensidad del chocolate de un brownie con la textura de una galleta.",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "GALLETA BISCOFF",
      description: "Elaborada con auténtica pasta de galletas Biscoff, estas galletas ofrecen ese distintivo sabor a caramelo y galleta especiada.",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop"
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

  return (
    <section className="py-8 px-4 overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          ref={containerRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredCookies.map((cookie) => (
            <motion.div 
              key={cookie.id} 
              className="flex flex-col"
              variants={item}
              whileHover={{ scale: 1.02 }}
            >
              <div className="overflow-hidden rounded-md">
                <motion.img 
                  src={cookie.image} 
                  alt={cookie.name} 
                  className="w-full h-48 object-cover rounded-md mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <h3 className="font-bold text-lg mb-2">{cookie.name}</h3>
              <p className="text-sm text-gray-600">{cookie.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}