import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-4 px-4 bg-purple-900 text-white text-xs">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            © 2024 Amar Bakery. Todos los derechos reservados. | Sabor que enamora
          </motion.p>
          
          <div className="flex gap-4 mt-2 md:mt-0">
            <motion.a 
              href="#" 
              className="hover:underline transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Política de Privacidad
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:underline transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Términos de Servicio
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}