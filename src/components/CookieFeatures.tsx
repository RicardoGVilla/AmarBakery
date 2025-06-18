import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function CookieFeatures() {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold uppercase mb-2">
              Galletas<br />
              Artesanales<br />
              Exclusivas Amar Bakery
            </h2>
            <p className="text-sm uppercase mb-6">
              Jugosas, masticables, gigantes y<br />
              absolutamente épicas, hechas con amor en Panamá
            </p>
            <p className="text-sm font-bold uppercase mb-4 text-pink-500">¡Sabor que enamora!</p>
          </motion.div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4">
            <motion.div 
              className="bg-pink-400 text-white p-4 rounded-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="uppercase font-bold mb-2">Visita nuestra<br />tienda en Panamá</h3>
              <Button className="bg-white text-pink-500 hover:bg-gray-100 uppercase text-sm transform transition-transform hover:scale-105">
                Conoce Amar Bakery
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800 text-white p-4 rounded-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="uppercase font-bold mb-2">Entrega<br />Local</h3>
              <Button className="bg-white text-gray-800 hover:bg-gray-100 uppercase text-sm transform transition-transform hover:scale-105">
                Pedir Ahora
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-purple-800 text-white p-4 rounded-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="uppercase font-bold mb-2">Envíos a<br />todo<br />Panamá</h3>
              <Button className="bg-white text-purple-800 hover:bg-gray-100 uppercase text-sm transform transition-transform hover:scale-105">
                Pedir Ahora
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}