//Developed by Neet Patel (SID - 8966335)

import React, { createContext, useContext, useEffect, useState } from "react";

//create context for cart
const CartContext = createContext();

//custom hook to access cart context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    //cart state
    const [cart, setCart] = useState([]);

    //load cart from localStorage on first render
    useEffect(() => {
        const storedCart = localStorage.getItem("estore_cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    //update localStorage when cart changes
    useEffect(() => {
        localStorage.setItem("estore_cart", JSON.stringify(cart));
    }, [cart]);

    //add new item or increase quantity if already exists
    const addToCart = (product) => {
        setCart(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) {
                return prev.map(p =>
                    p.id === product.id
                        ? { ...p, quantity: (p.quantity || 1) + (product.quantity || 1) }
                        : p
                );
            }
            return [...prev, { ...product, quantity: product.quantity || 1 }];
        });
    };

    //remove item by id
    const removeFromCart = (id) => {
        setCart(prev => prev.filter(p => p.id !== id));
    };

    //calculate subtotal, tax, total
    const getTotal = () => {
        const subtotal = cart.reduce(
            (sum, p) => sum + p.price * (p.quantity || 1),
            0
        );
        const tax = +(subtotal * 0.13).toFixed(2);
        const total = +(subtotal + tax).toFixed(2);
        return { subtotal, tax, total };
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};
