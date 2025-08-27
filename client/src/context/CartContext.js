// src/context/CartContext.js
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
    cart: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItem = state.cart.find((item) => item._id === action.payload._id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item._id === action.payload._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }],
                };
            }
        }

        case "REMOVE_FROM_CART": {
            return {
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload),
            };
        }

        case "INCREMENT": {
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        }

        case "DECREMENT": {
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item._id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };
        }

        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
            };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
