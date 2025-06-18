import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function BiggestCookie() {
  return (
    <section className="py-10 px-4 bg-pink-400 text-white overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold uppercase mb-6">
              La galleta<br />
              con chispas<br />
              de chocolate<br />
              más grande de Panamá<br />
              <span className='text-pink-200 text-lg normal-case font-semibold'>by Amar Bakery</span>
            </h2>
            
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="font-bold uppercase mb-2">Exclusivas en Amar Bakery, Panamá</h3>
              <p className="text-sm mb-4">
                Nuestras galletas gigantes son perfectas para compartir o para darte un capricho especial.
              </p>
            </motion.div>
            
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="font-bold uppercase mb-2">Ingredientes</h3>
              <p className="text-sm mb-4">
                Elaboradas con chocolate belga de primera calidad, mantequilla francesa y los mejores ingredientes locales.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Button className="bg-white text-pink-500 hover:bg-gray-100 rounded-full uppercase mb-4 transform transition-transform hover:scale-105">
                Pedir Aquí
              </Button>
              
              <p className="text-sm">
                ¡Entregamos a domicilio en todo Panamá!
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="overflow-hidden rounded-md">
              <motion.img 
                src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop" 
                alt="Galleta gigante" 
                className="w-full h-48 object-cover rounded-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="overflow-hidden rounded-md">
              <motion.img 
                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop" 
                alt="Galleta con chispas" 
                className="w-full h-48 object-cover rounded-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}