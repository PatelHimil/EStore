//Developed by Himil Patel (SID - 8971713)

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
    const { cart } = useCart();

    //calculate total item count from cart
    const itemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

    return (
        <nav className="navbar navbar-expand-lg enhanced-navbar">
            <div className="container">
                {/*brand link*/}
                <Link to="/" className="navbar-brand fw-bold text-cyan fs-4">
                    EStore
                </Link>

                {/*mobile nav toggle button*/}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon text-white"></span>
                </button>

                {/*nav links*/}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/products" className="nav-link">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cart" className="nav-link">
                                Cart <span className="badge bg-info text-dark">{itemCount}</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/checkout" className="nav-link">Checkout</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
