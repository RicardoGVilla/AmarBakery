import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="bg-purple-800 text-white py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Envíos a todo<br />el país
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Button className="bg-white text-purple-800 hover:bg-gray-100 rounded-full px-6 uppercase font-medium transform transition-transform hover:scale-105">
            Pedir Aquí
          </Button>
        </motion.div>
        
        <div className="flex justify-center gap-4 mt-8 overflow-x-auto pb-2 snap-x">
          <motion.img 
            src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop" 
            alt="Galletas de chocolate" 
            className="w-[200px] h-[150px] rounded-lg object-cover snap-center hover:scale-105 transition-transform cursor-pointer shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
          />
          <motion.img 
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop" 
            alt="Galletas con chispas de chocolate" 
            className="w-[200px] h-[150px] rounded-lg object-cover snap-center hover:scale-105 transition-transform cursor-pointer shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
          />
          <motion.img 
            src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=300&fit=crop" 
            alt="Galletas de avena" 
            className="w-[200px] h-[150px] rounded-lg object-cover snap-center hover:scale-105 transition-transform cursor-pointer shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
          />
          <motion.img 
            src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop" 
            alt="Galletas de azúcar" 
            className="w-[200px] h-[150px] rounded-lg object-cover snap-center hover:scale-105 transition-transform cursor-pointer shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </div>
    </section>
  );
}