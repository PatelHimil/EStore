//Developed by Vishva Patel (SID - 8987097)

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
    const { cart, getTotal, setCart } = useCart(); //included setCart
    const { subtotal, tax, total } = getTotal();
    const navigate = useNavigate();

    //store user form inputs
    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        pin: "",
        card: "",
        cvv: ""
    });

    //handle user input change
    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    //handle form submit with basic validation
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, address, phone, pin, card, cvv } = form;

        //updated PIN validation to support A0A 0A0 and A0A0A0
        const pinValid = /^([A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d)$/.test(pin);
        const phoneValid = /^[0-9]{10}$/.test(phone);

        if (!name || !address || !card || !cvv || !pin || !phone ||
            card.length !== 16 || cvv.length !== 3 || !pinValid || !phoneValid) {
            alert("Please fill out all fields correctly.");
            return;
        }

        setCart([]); //empty cart after successful checkout
        navigate("/thankyou"); //go to thank you page
    };

    useEffect(() => {
        //fade-in animation on scroll
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

    //show empty cart message
    if (cart.length === 0) {
        return (
            <div className="container">
                <div className="glass-container text-center fade-in-on-scroll">
                    <h2 className="section-title">Checkout</h2>
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
    }

    return (
        <div className="container">
            <div className="glass-container fade-in-on-scroll">
                <h2 className="section-title">Checkout</h2>

                {/*show items in cart*/}
                <div className="mb-4">
                    <h5 style={{ color: "#f8f9fa" }}>Review Your Items:</h5>
                    {cart.map(item => (
                        <div key={item.id} className="review-item">
                            {item.name} × {item.quantity || 1} — ${item.price.toFixed(2)} each
                        </div>
                    ))}
                    <div className="checkout-totals mt-3">
                        <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                        <p>Tax (13%): <strong>${tax.toFixed(2)}</strong></p>
                        <p className="fs-5">Total: <strong>${total.toFixed(2)}</strong></p>
                    </div>
                </div>

                {/*checkout form*/}
                <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
                    <div className="col-md-6">
                        <label className="form-label">Full Name</label>
                        <input
                            name="name"
                            className="form-control"
                            value={form.name}
                            onChange={handleChange}
                            maxLength={40}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input
                            name="phone"
                            className="form-control"
                            maxLength="10"
                            value={form.phone}
                            onChange={handleChange}
                            pattern="\d{10}"
                            required
                        />
                    </div>

                    <div className="col-md-8">
                        <label className="form-label">Shipping Address</label>
                        <input
                            name="address"
                            className="form-control"
                            value={form.address}
                            onChange={handleChange}
                            maxLength={100}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">PIN Code</label>
                        <input
                            name="pin"
                            className="form-control"
                            maxLength="7"
                            value={form.pin}
                            onChange={handleChange}
                            pattern="[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d"
                            required
                        />
                    </div>

                    <div className="col-md-8">
                        <label className="form-label">Card Number</label>
                        <input
                            name="card"
                            className="form-control"
                            maxLength="16"
                            value={form.card}
                            onChange={handleChange}
                            pattern="\d{16}"
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">CVV</label>
                        <input
                            name="cvv"
                            type="password"
                            className="form-control"
                            maxLength="3"
                            value={form.cvv}
                            onChange={handleChange}
                            pattern="\d{3}"
                            required
                        />
                    </div>

                    {/*submit button*/}
                    <div className="col-12 mt-3">
                        <button type="submit" className="btn btn-info fw-bold px-4">
                            <i className="bi bi-check2-circle me-1"></i> Confirm Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
