import React, { useState } from "react";
import { useCart, useCartDispatch } from "../CartContext";
import { Button } from "./ui/button";
import { Trash2, Calendar as CalendarIcon, Store, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

const locations = [
  {
    id: 1,
    name: "Amar Bakery Obarrio",
    address: "Calle 50, Obarrio, Ciudad de Panamá, Panamá",
  },
  {
    id: 2,
    name: "Amar Bakery Costa del Este",
    address: "Ave. Centenario, Costa del Este, Ciudad de Panamá, Panamá",
  },
];

const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export function CartModal({ open, onClose }: CartModalProps) {
  const cart = useCart();
  const dispatch = useCartDispatch();
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [notes, setNotes] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(locations[0].id);
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("");

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white h-full w-full max-w-md shadow-lg flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Tu Carrito</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">×</button>
                </div>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-center text-gray-500">Tu carrito está vacío.</p>
              </div>
            ) : (
                <>
                <div className="flex-1 overflow-y-auto px-6">
                    {cart.map(item => (
                    <div key={item.id} className="flex items-start gap-4 py-4 border-b">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                        <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                            <button onClick={() => dispatch({ type: 'DECREMENT_ITEM', id: item.id })} className="border rounded-md w-6 h-6">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => dispatch({ type: 'ADD_ITEM', item })} className="border rounded-md w-6 h-6">+</button>
                        </div>
                        </div>
                        <div className="text-right">
                        <p className="font-semibold">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
                        <button onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })} className="text-red-500 hover:text-red-700 mt-2">
                            <Trash2 size={16} />
                        </button>
                        </div>
                    </div>
                    ))}
                    <div className="mt-4">
                        <label className="font-semibold mb-2 block">Notas</label>
                        <textarea
                            className="w-full border rounded-md p-2 text-sm"
                            rows={3}
                            placeholder="Instrucciones especiales para tu pedido..."
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-6 border-t mt-auto flex-shrink-0">
                    <div className="flex justify-between items-center font-bold text-lg mb-2">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)} CAD</span>
                    </div>
                    <p className="text-xs text-gray-500 text-center mb-4">Taxes and shipping calculated at checkout</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-gray-100 rounded-md">
                        <Button variant={orderType === 'pickup' ? 'default' : 'ghost'} onClick={() => setOrderType('pickup')} className={cn("flex gap-2", orderType === 'pickup' && 'bg-white shadow')}>
                            <Store size={18}/> Recoger en tienda
                        </Button>
                        <Button variant={orderType === 'delivery' ? 'default' : 'ghost'} onClick={() => setOrderType('delivery')} className={cn("flex gap-2", orderType === 'delivery' && 'bg-white shadow')}>
                            <Truck size={18}/> Entrega a domicilio
                        </Button>
                    </div>

                    {orderType === 'pickup' && (
                    <div className="space-y-3">
                        <p className="font-semibold text-sm">Por favor, elige un punto de recogida, fecha y hora:</p>
                        {locations.map(loc => (
                            <div key={loc.id} className={cn("border rounded-md p-3 cursor-pointer", selectedLocation === loc.id && 'border-purple-600 bg-purple-50')} onClick={() => setSelectedLocation(loc.id)}>
                                <div className="flex items-center">
                                    <input type="radio" name="location" value={loc.id} checked={selectedLocation === loc.id} readOnly className="mr-3 accent-purple-600"/>
                                    <div>
                                        <p className="font-bold">{loc.name}</p>
                                        <p className="text-sm text-gray-600">{loc.address}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="grid grid-cols-2 gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Elige una fecha</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                            <select className="w-full border rounded-md p-2 text-sm" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} disabled={!date}>
                                <option value="">Elige una hora</option>
                                {timeSlots.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    )}

                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white" disabled={orderType === 'pickup' && (!date || !selectedTime)}>CHECK OUT</Button>
                </div>
                </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 