import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";

export function ContactForm() {
  const [formState, setFormState] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formState);
    // Reset form
    setFormState({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    });
    // Show success message
    alert('Mensaje enviado con éxito!');
  };

  return (
    <section className="py-12 px-4 bg-purple-800 text-white overflow-hidden">
      <div className="container mx-auto">
        <motion.h2 
          className="text-2xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Contáctanos
        </motion.h2>
        <motion.p 
          className="text-center mb-8 text-lg text-pink-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          ¿Quieres probar el auténtico sabor de Amar Bakery? ¡Escríbenos y déjate enamorar por nuestras galletas!
        </motion.p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
            
            <div className="mb-6">
              <h4 className="font-bold">Teléfono</h4>
              <p>+507 123-4567</p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold">Email</h4>
              <p>info@amarbakery.pa</p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold">Dirección</h4>
              <p>Calle 50, Obarrio<br />Ciudad de Panamá, Panamá</p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold">Horarios</h4>
              <p>
                Lunes - Viernes: 9:00 - 20:00<br />
                Sábados: 10:00 - 18:00<br />
                Domingos: 10:00 - 15:00
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre" className="block mb-1 text-sm">Nombre *</label>
                <Input 
                  id="nombre" 
                  value={formState.nombre}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-1 focus:ring-white" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-1 text-sm">Email *</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-1 focus:ring-white" 
                />
              </div>
              
              <div>
                <label htmlFor="telefono" className="block mb-1 text-sm">Teléfono</label>
                <Input 
                  id="telefono" 
                  value={formState.telefono}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-1 focus:ring-white" 
                />
              </div>
              
              <div>
                <label htmlFor="mensaje" className="block mb-1 text-sm">Mensaje *</label>
                <Textarea 
                  id="mensaje" 
                  rows={5}
                  value={formState.mensaje}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none w-full focus:border-white focus:ring-1 focus:ring-white"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 transform transition-transform hover:scale-105"
              >
                Enviar Mensaje
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}