//Developed by Neet Patel (SID - 8966335)

import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cart, setCart, removeFromCart, getTotal } = useCart();
    const navigate = useNavigate();

    //update item quantity based on input
    const updateQty = (id, newQty) => {
        const qty = Math.max(1, parseInt(newQty) || 1);
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
    };

    //get calculated totals from context
    const { subtotal, tax, total } = getTotal();

    useEffect(() => {
        //trigger fade-in animation on scroll
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        const el = document.querySelector(".fade-in-on-scroll");
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    //show message if cart is empty
    if (cart.length === 0)
        return (
            <div className="container">
                <div className="glass-container text-center fade-in-on-scroll">
                    <h2 className="section-title">Your Cart</h2>
                    <p className="text-light">Your cart is empty.</p>
                    <button
                        className="btn btn-outline-info mt-3"
                        onClick={() => navigate("/products")}
                    >
                        <i className="bi bi-box-arrow-left me-1"></i> Back to Products
                    </button>
                </div>
            </div>
        );

    return (
        <div className="container">
            <div className="glass-container fade-in-on-scroll">
                <h2 className="section-title">Your Cart</h2>

                {/*cart item table*/}
                <div className="table-responsive">
                    <table className="table table-dark table-striped align-middle">
                        <thead>
                            <tr>
                                <th>Product</th><th>Qty</th><th>Price</th><th>Total</th><th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control bg-dark text-white text-center"
                                            value={item.quantity || 1}
                                            onChange={(e) => updateQty(item.id, e.target.value)}
                                            style={{ width: "80px" }}
                                        />
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <i className="bi bi-x-circle me-1"></i> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/*price summary section*/}
                <div className="checkout-totals mt-4">
                    <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                    <p>Tax (13%): <strong>${tax.toFixed(2)}</strong></p>
                    <p className="fs-5">Total: <strong>${total.toFixed(2)}</strong></p>
                </div>

                {/*checkout button*/}
                <div className="text-end mt-3">
                    <button
                        className="btn btn-info fw-bold px-4"
                        onClick={() => navigate("/checkout")}
                    >
                        <i className="bi bi-arrow-right-circle me-1"></i> Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
