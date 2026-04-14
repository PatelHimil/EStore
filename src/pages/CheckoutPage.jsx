import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
    const { cart, getTotal, setCart } = useCart();
    const { subtotal, tax, total } = getTotal();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        pin: "",
        card: "",
        cvv: ""
    });

    const handleChange = (e) => {
        let { name, value } = e.target;

        // numbers only fields
        if (["phone", "card", "cvv"].includes(name)) {
            value = value.replace(/\D/g, "");
        }

        // PIN formatting (A1A1A1)
        if (name === "pin") {
            value = value.toUpperCase();

            // allow only A-Z and 0-9
            value = value.replace(/[^A-Z0-9]/g, "");

            // limit to 6 characters
            value = value.slice(0, 6);
        }

        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, address, phone, pin, card, cvv } = form;

        const pinValid = /^([A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d)$/.test(pin);
        const phoneValid = /^[0-9]{10}$/.test(phone);

        if (!name || !address || !card || !cvv || !pin || !phone ||
            card.length !== 16 || cvv.length !== 3 || !pinValid || !phoneValid) {
            alert("Please fill out all fields correctly.");
            return;
        }

        setCart([]);
        navigate("/thankyou");
    };

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        const elements = document.querySelectorAll(".fade-in-on-scroll");
        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    if (cart.length === 0) {
        return (
            <div className="container">
                <div className="glass-container text-center fade-in-on-scroll">
                    <h2 className="section-title">Checkout</h2>
                    <p className="text-light">Your cart is empty.</p>
                    <button className="btn btn-outline-info mt-3" onClick={() => navigate("/products")}>
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="glass-container fade-in-on-scroll">
                <h2 className="section-title">Checkout</h2>

                {/* CART REVIEW */}
                <div className="mb-4">
                    <h5 className="review-title">Review Your Items</h5>

                    {cart.map(item => (
                        <div key={item.id} className="review-item">
                            <span>{item.name} × {item.quantity || 1}</span>
                            <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="checkout-totals mt-3">
                        <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                        <p>Tax (13%): <strong>${tax.toFixed(2)}</strong></p>
                        <p className="total">Total: <strong>${total.toFixed(2)}</strong></p>
                    </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="row g-3">

                    <div className="col-md-6">
                        <div className="form-group with-icon">
                            <i className="bi bi-person"></i>
                            <input name="name" value={form.name} onChange={handleChange} required />
                            <label>Full Name</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group with-icon">
                            <i className="bi bi-telephone"></i>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                maxLength="10"
                                pattern="\d{10}"
                                inputMode="numeric"
                                required
                            />
                            <label>Phone Number</label>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="form-group with-icon">
                            <i className="bi bi-geo-alt"></i>
                            <input name="address" value={form.address} onChange={handleChange} required />
                            <label>Shipping Address</label>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                name="pin"
                                value={form.pin}
                                onChange={handleChange}
                                maxLength="6"
                                pattern="[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d"
                                required
                            />
                            <label>PIN Code</label>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="form-group with-icon">
                            <i className="bi bi-credit-card"></i>
                            <input
                                name="card"
                                value={form.card}
                                onChange={handleChange}
                                maxLength="16"
                                pattern="\d{16}"
                                inputMode="numeric"
                                required
                            />
                            <label>Card Number</label>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="password"
                                name="cvv"
                                value={form.cvv}
                                onChange={handleChange}
                                maxLength="3"
                                pattern="\d{3}"
                                inputMode="numeric"
                                required
                            />
                            <label>CVV</label>
                        </div>
                    </div>

                    <div className="col-12 mt-3">
                        <button type="submit" className="btn btn-info fw-bold px-4 py-2">
                            Confirm Order 🚀
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;