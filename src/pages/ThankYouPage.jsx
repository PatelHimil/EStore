import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
    //trigger fade-in animation on scroll
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

        const elements = document.querySelectorAll(".fade-in-on-scroll");
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="container text-center text-white py-5">
            <div className="glass-container fade-in-on-scroll">
                {/*thank you message*/}
                <h2 className="mb-3 text-cyan">Thank you for your purchase!</h2>
                <p className="lead">We hope you enjoy your new product.</p>
                <hr className="border border-info w-25 mx-auto" />

                {/*explore more products button*/}
                <Link to="/products" className="btn btn-info fw-bold mt-4 px-4">
                    Explore More Products
                </Link>
            </div>
        </div>
    );
};

export default ThankYouPage;
