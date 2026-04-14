import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

//shuffle products and pick 6
const original = [...products].sort(() => 0.5 - Math.random()).slice(0, 6);

//duplicate to enable looping scroll
const featured = [...original, ...original];

const HomePage = () => {
    const scrollRef = useRef(null);

    //auto-scroll carousel horizontally
    useEffect(() => {
        const scroll = scrollRef.current;
        let interval;

        const startScroll = () => {
            interval = setInterval(() => {
                if (scroll) {
                    scroll.scrollLeft += 0.5;
                    if (scroll.scrollLeft >= scroll.scrollWidth / 2) {
                        scroll.scrollLeft = 0;
                    }
                }
            }, 20);
        };

        const stopScroll = () => clearInterval(interval);

        if (scroll) {
            startScroll();
            scroll.addEventListener("mouseenter", stopScroll);
            scroll.addEventListener("mouseleave", startScroll);
        }

        return () => {
            clearInterval(interval);
            if (scroll) {
                scroll.removeEventListener("mouseenter", stopScroll);
                scroll.removeEventListener("mouseleave", startScroll);
            }
        };
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
            {/* HERO SECTION */}
            <div className="glass-container text-center py-5 fade-in-on-scroll hero-section">
                <h1 className="hero-title mb-3">
                    Welcome to <span>EStore</span>
                </h1>

                <p className="hero-subtitle mb-4">
                    Shop the latest electronics:
                    <span className="text-primary"> Phones</span>,
                    <span className="text-warning"> Earbuds</span>,
                    <span className="text-success"> Chargers</span> &
                    <span className="text-danger"> more</span>.
                </p>

                {/* FEATURE CARDS */}
                <div className="feature-box">
                    <div className="feature-item">
                        <i className="bi bi-truck"></i>
                        <p>Free Shipping</p>
                    </div>

                    <div className="feature-item">
                        <i className="bi bi-shield-lock"></i>
                        <p>Secure Checkout</p>
                    </div>

                    <div className="feature-item">
                        <i className="bi bi-stars"></i>
                        <p>Top Brands</p>
                    </div>
                </div>

                {/* CTA BUTTON */}
                <Link to="/products" className="hero-btn mt-4">
                    Browse Products 🚀
                </Link>
            </div>

            {/* FEATURED PRODUCTS */}
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
                                <button className="btn btn-outline-info btn-sm">
                                    View
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;