import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // control toast visibility
    const [showToast, setShowToast] = useState(false);

    // handle add-to-cart logic
    const handleAdd = (e) => {
        e.stopPropagation(); // 🔥 prevent card click
        addToCart({ ...product, quantity: 1 });
        setShowToast(true);
    };

    // handle card click → go to product detail
    const handleCardClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div
            className="product-card fade-in-on-scroll"
            onClick={handleCardClick}
        >
            {/* image section */}
            <div className="product-img-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-card-img"
                    loading="lazy"
                />
            </div>

            {/* info section */}
            <div className="product-card-info">
                <h5 className="card-title mt-3">{product.name}</h5>

                {/* 🔥 better price display */}
                <p className="product-price">
                    ${product.price.toFixed(2)}
                </p>

                {/* action buttons */}
                <div className="product-buttons mt-3">
                    <button
                        className="btn btn-outline-info"
                        onClick={handleAdd}
                    >
                        Add to Cart
                    </button>

                    {/* 🔥 prevent click bubbling */}
                    <Link
                        to={`/products/${product.id}`}
                        className="btn btn-outline-light"
                        onClick={(e) => e.stopPropagation()}
                    >
                        View
                    </Link>
                </div>
            </div>

            {/* toast */}
            {showToast && (
                <Toast
                    message={`${product.name} added to cart!`}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default ProductCard;