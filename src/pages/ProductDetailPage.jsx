//Developed by Urvishkumar Jariwala (SID - 8962495)
//Developed by Himil Patel (SID - 8971713)

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import Toast from "../components/Toast";

const ProductDetailPage = () => {
    //get product ID from URL
    const { id } = useParams();

    //find matching product from product list
    const product = products.find(p => p.id === parseInt(id));

    const { addToCart } = useCart();

    //default quantity
    const [qty, setQty] = useState(1);

    //control toast visibility
    const [showToast, setShowToast] = useState(false);

    //fade-in effect for container
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const el = document.querySelector(".fade-in-on-scroll");
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    //handle product not found
    if (!product) {
        return (
            <div className="text-center text-danger mt-5">
                Product not found.
            </div>
        );
    }

    //increase or decrease quantity
    const handleQty = (change) => {
        setQty(prev => Math.max(1, prev + change));
    };

    //add product to cart and show toast
    const handleAddToCart = () => {
        addToCart({ ...product, quantity: qty });
        setShowToast(true);
    };

    return (
        <div className="container py-5 text-white">
            <div className="glass-container fade-in-on-scroll">
                <div className="row align-items-center">
                    {/*left section with image*/}
                    <div className="col-md-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: "350px", objectFit: "contain" }}
                        />
                    </div>

                    {/*right section with product info*/}
                    <div className="col-md-6 mt-4 mt-md-0">
                        <h2 className="text-cyan">{product.name}</h2>
                        <p className="lead">{product.description}</p>
                        <h4 className="text-info">${product.price.toFixed(2)}</h4>

                        {/*quantity controls*/}
                        <div className="d-flex align-items-center gap-2 my-3">
                            <button className="btn btn-outline-light btn-sm" onClick={() => handleQty(-1)}>-</button>
                            <input
                                type="number"
                                className="form-control bg-dark text-white text-center"
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                                style={{ width: "80px" }}
                                min="1"
                            />
                            <button className="btn btn-outline-light btn-sm" onClick={() => handleQty(1)}>+</button>
                        </div>

                        {/*add to cart button*/}
                        <button
                            className="btn btn-info fw-bold text-dark mt-2"
                            onClick={handleAddToCart}
                        >
                            Add {qty} to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/*show toast if added*/}
            {showToast && (
                <Toast
                    message={`${product.name} added to cart!`}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default ProductDetailPage;
