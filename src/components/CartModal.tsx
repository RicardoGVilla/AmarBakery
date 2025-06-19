import React, { useState } from "react";
import { useCart, useCartDispatch } from "../CartContext";
import { Button } from "./ui/button";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export function CartModal({ open, onClose }: CartModalProps) {
  const cart = useCart();
  const dispatch = useCartDispatch();
  const [orderType, setOrderType] = useState<"" | "pickup" | "delivery">("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleDelivery = () => {
    // Simulate forwarding to PedidosYa
    console.log("Forwarding to PedidosYa...");
    alert("Redirigiendo a PedidosYa para completar tu pedido de entrega.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-purple-800">Tu Carrito</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map((item, idx) => (
              <li key={idx} className="flex items-center py-2 gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.price}</div>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}
                >
                  Quitar
                </Button>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <div className="mb-4">
            <div className="flex gap-2 justify-center mb-2">
              <Button
                variant={orderType === "pickup" ? "default" : "outline"}
                onClick={() => setOrderType("pickup")}
              >
                Recoger en tienda
              </Button>
              <Button
                variant={orderType === "delivery" ? "default" : "outline"}
                onClick={() => setOrderType("delivery")}
              >
                Entrega a domicilio
              </Button>
            </div>
            {orderType === "pickup" && (
              <div className="mt-4">
                <label className="block mb-2 font-medium">Selecciona fecha:</label>
                <input
                  type="date"
                  className="border rounded px-2 py-1 mb-2 w-full"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <label className="block mb-2 font-medium">Selecciona hora:</label>
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={selectedTime}
                  onChange={e => setSelectedTime(e.target.value)}
                >
                  <option value="">Selecciona un horario</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {selectedDate && selectedTime && !sent && (
                  <>
                    <div className="mt-4 text-center text-yellow-600 font-semibold">
                      Tu solicitud de pedido será enviada al restaurante. Espera la confirmación por WhatsApp.
                    </div>
                    <div className="mt-4">
                      <label className="block mb-2 font-medium">Tu correo electrónico:</label>
                      <input
                        type="email"
                        className="border rounded px-2 py-1 w-full"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="ejemplo@email.com"
                        required
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <Button
                        className="bg-green-500 hover:bg-green-600"
                        disabled={!email}
                        onClick={() => {
                          const phone = "5145768750";
                          const date = selectedDate.split("-").reverse().join("/");
                          const summary = cart.map(item => `• ${item.name} (${item.price})`).join("%0A");
                          const message =
                            `Hola, soy un cliente de Amar Bakery y me gustaría solicitar un pedido para recoger en tienda.%0A%0A` +
                            `Resumen del pedido:%0A${summary}%0A%0A` +
                            `Fecha de recogida: ${date}%0A` +
                            `Hora: ${selectedTime}%0A%0A` +
                            `Email de contacto: ${email}%0A%0A` +
                            `Por favor, confirme si mi pedido puede estar listo para la fecha y hora seleccionadas. Gracias.`;
                          const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                          window.open(url, "_blank");
                          setSent(true);
                        }}
                      >
                        Enviar pedido por WhatsApp
                      </Button>
                    </div>
                  </>
                )}
                {sent && (
                  <div className="mt-6 text-center text-green-700 font-semibold">
                    Tu solicitud ha sido enviada. El restaurante te confirmará por WhatsApp o correo electrónico.
                  </div>
                )}
              </div>
            )}
            {orderType === "delivery" && (
              <div className="mt-4 text-center">
                <Button className="bg-pink-500 hover:bg-pink-600" onClick={handleDelivery}>
                  Proceder a PedidosYa
                </Button>
              </div>
            )}
          </div>
        )}
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
} 