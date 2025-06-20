import React, { useState } from "react";
import { useCart, useCartDispatch } from "../CartContext";
import { Button } from "../components/ui/button";
import { Trash2, Calendar as CalendarIcon, Store, Truck } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

export function CartPage() {
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
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
        
        {cart.length === 0 ? (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Tu carrito está vacío.</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {cart.map(item => (
                        <div key={item.id} className="flex items-start gap-4 py-4 border-b">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
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
                </div>

                <div className="bg-gray-50 p-6 rounded-lg self-start">
                    <div className="flex justify-between items-center font-bold text-lg mb-2">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)} CAD</span>
                    </div>
                    <p className="text-xs text-gray-500 text-center mb-4">Taxes and shipping calculated at checkout</p>
                    
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

                    <div className="grid grid-cols-2 gap-2 my-4 p-1 bg-gray-200 rounded-md">
                        <Button variant={orderType === 'pickup' ? 'default' : 'ghost'} onClick={() => setOrderType('pickup')} className={cn("flex gap-2 text-sm", orderType === 'pickup' && 'bg-white shadow')}>
                            <Store size={18}/> Recoger en tienda
                        </Button>
                        <Button variant={orderType === 'delivery' ? 'default' : 'ghost'} onClick={() => setOrderType('delivery')} className={cn("flex gap-2 text-sm", orderType === 'delivery' && 'bg-white shadow')}>
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
                                        <p className="font-bold text-sm">{loc.name}</p>
                                        <p className="text-xs text-gray-600">{loc.address}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="grid grid-cols-2 gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className="w-full justify-start text-left font-normal text-sm">
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
            </div>
        )}
    </div>
  );
} 