//Developed by Himil Patel (SID - 8971713)

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

//shuffle products and pick 6
const original = products.sort(() => 0.5 - Math.random()).slice(0, 6);

//duplicate to enable looping scroll
const featured = [...original, ...original];

const HomePage = () => {
    const scrollRef = useRef(null);

    //auto-scroll carousel horizontally
    useEffect(() => {
        const scroll = scrollRef.current;
        const interval = setInterval(() => {
            if (scroll) {
                scroll.scrollLeft += 2;
                if (scroll.scrollLeft >= scroll.scrollWidth / 2) {
                    scroll.scrollLeft = 0;
                }
            }
        }, 15);
        return () => clearInterval(interval);
    }, []);

    //fade-in animation on scroll into view
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
            { threshold: 0.15 }
        );

        const animatedElements = document.querySelectorAll(".fade-in-on-scroll");
        animatedElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="container">
            {/*intro banner*/}
            <div className="glass-container text-center py-5 fade-in-on-scroll">
                <h1 className="display-5 fw-bold text-cyan mb-3">
                    Welcome to <span className="text-info">EStore!</span>
                </h1>
                <p className="lead mb-4">
                    Shop the latest electronics:
                    <span className="text-primary">Phones</span>,{" "}
                    <span className="text-warning">Earbuds</span>,{" "}
                    <span className="text-success">Chargers</span> &{" "}
                    <span className="text-danger">more.</span>
                </p>

                {/*feature highlights*/}
                <div className="row justify-content-center mb-4">
                    <div className="col-md-10">
                        <div className="d-flex justify-content-around flex-wrap bg-dark rounded p-3 gap-4">
                            <div className="text-white">
                                <i className="bi bi-truck fs-4 text-success"></i><br />
                                Free Shipping
                            </div>
                            <div className="text-white">
                                <i className="bi bi-shield-lock fs-4 text-warning"></i><br />
                                Secure Checkout
                            </div>
                            <div className="text-white">
                                <i className="bi bi-stars fs-4 text-info"></i><br />
                                Top Brands
                            </div>
                        </div>
                    </div>
                </div>

                {/*browse button*/}
                <Link to="/products">
                    <button className="btn btn-info fw-bold px-4 py-2">
                        Browse Products
                    </button>
                </Link>
            </div>

            {/*featured product carousel*/}
            <div className="glass-container mt-4 fade-in-on-scroll">
                <h2 className="section-title">Featured Products</h2>
                <div ref={scrollRef} className="scrolling-carousel">
                    {featured.map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            className="mini-card"
                        >
                            <img src={product.image} alt={product.name} />
                            <h5>{product.name}</h5>
                            <Link to={`/products/${product.id}`}>
                                <button className="btn btn-outline-info btn-sm">View</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;