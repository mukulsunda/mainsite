"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types
export interface PrintCartItem {
  id: string;
  type: 'print';
  fileName: string;
  fileSize: number;
  fileType: string;
  fileData: string; // base64 encoded file
  dimensions: { x: number; y: number; z: number };
  volume: number;
  material: string;
  color: string;
  colorHex: string;
  quality: string;
  infill: number;
  scale: number;
  quantity: number;
  estimatedWeight: number;
  estimatedTime: string;
  unitPrice: number;
  totalPrice: number;
  instructions: string;
  addedAt: string;
}

export interface ProductCartItem {
  id: string;
  type: 'product';
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export type CartItem = PrintCartItem | ProductCartItem;

interface CartState {
  items: CartItem[];
  isLoading: boolean;
}

type CartAction =
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean };

interface CartContextType {
  state: CartState;
  addPrintItem: (item: Omit<PrintCartItem, 'id' | 'type' | 'addedAt'>) => void;
  addProductItem: (item: Omit<ProductCartItem, 'id' | 'type'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getPrintItems: () => PrintCartItem[];
  getProductItems: () => ProductCartItem[];
}

const CART_STORAGE_KEY = 'boxpox_cart';

const initialState: CartState = {
  items: [],
  isLoading: true,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload, isLoading: false };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'SET_ITEMS', payload: parsed });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!state.isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [state.items, state.isLoading]);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addPrintItem = (item: Omit<PrintCartItem, 'id' | 'type' | 'addedAt'>) => {
    const newItem: PrintCartItem = {
      ...item,
      id: generateId(),
      type: 'print',
      addedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  const addProductItem = (item: Omit<ProductCartItem, 'id' | 'type'>) => {
    // Check if product already exists in cart
    const existingItem = state.items.find(
      i => i.type === 'product' && (i as ProductCartItem).productId === item.productId
    );

    if (existingItem) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: existingItem.id, quantity: existingItem.quantity + item.quantity },
      });
    } else {
      const newItem: ProductCartItem = {
        ...item,
        id: generateId(),
        type: 'product',
      };
      dispatch({ type: 'ADD_ITEM', payload: newItem });
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      if (item.type === 'print') {
        return total + (item as PrintCartItem).totalPrice;
      } else {
        return total + (item as ProductCartItem).price * item.quantity;
      }
    }, 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getPrintItems = () => {
    return state.items.filter(item => item.type === 'print') as PrintCartItem[];
  };

  const getProductItems = () => {
    return state.items.filter(item => item.type === 'product') as ProductCartItem[];
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addPrintItem,
        addProductItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getPrintItems,
        getProductItems,
      }}
    >
      {children}
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
