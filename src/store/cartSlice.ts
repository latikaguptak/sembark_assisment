import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};


const saveCart = (state: CartState) => {
  try {
    localStorage.setItem("ecommerce-cart", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem("ecommerce-cart");
    if (savedCart) return JSON.parse(savedCart) as CartState;
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return initialState;
};


const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;
      saveCart(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find((item) => item.id === action.payload);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      saveCart(state);
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        const quantityDiff = action.payload.quantity - existingItem.quantity;
        existingItem.quantity = action.payload.quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += existingItem.price * quantityDiff;
      }

      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      saveCart(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
