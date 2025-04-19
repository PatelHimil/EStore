//Developed by Urvishkumar Jariwala (SID - 8962495)
//Developed by Himil Patel (SID - 8971713)

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    //control toast visibility
    const [showToast, setShowToast] = useState(false);

    //handle add-to-cart logic
    const handleAdd = () => {
        addToCart({ ...product, quantity: 1 });
        setShowToast(true);
    };

    return (
        <div className="product-card fade-in-on-scroll">
            {/*image section*/}
            <div className="product-img-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-card-img"
                />
            </div>

            {/*info section*/}
            <div className="product-card-info">
                <h5 className="card-title mt-3">{product.name}</h5>
                <p className="text-info fw-bold">${product.price.toFixed(2)}</p>

                {/*action buttons*/}
                <div className="product-buttons mt-3">
                    <button className="btn btn-outline-info" onClick={handleAdd}>
                        Add
                    </button>
                    <Link to={`/products/${product.id}`} className="btn btn-outline-light">
                        Details
                    </Link>
                </div>
            </div>

            {/*show toast when item added*/}
            {showToast && (
                <Toast
                    message={`added to cart!`}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default ProductCard;
