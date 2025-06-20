import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the type for a cart item (cookie)
export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

type CartState = CartItem[];

type CartAction =
  | { type: 'ADD_ITEM'; item: Omit<CartItem, 'quantity'> }
  | { type: 'DECREMENT_ITEM'; id: number }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.findIndex(item => item.id === action.item.id);
      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const newState = [...state];
        newState[existingItemIndex].quantity += 1;
        return newState;
      } else {
        // Item does not exist, add it with quantity 1
        return [...state, { ...action.item, quantity: 1 }];
      }
    }
    case 'DECREMENT_ITEM': {
        const existingItem = state.find(item => item.id === action.id);
        if (existingItem && existingItem.quantity === 1) {
            // if quantity is 1, remove it from the cart
            return state.filter(item => item.id !== action.id);
        }
        // otherwise, just decrement the quantity
        return state.map(item =>
            item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
        );
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

const CartContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
} 