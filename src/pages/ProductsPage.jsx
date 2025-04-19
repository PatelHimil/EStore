//Developed by Urvishkumar Jariwala (SID - 8962495)

import React, { useEffect, useRef, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
    //store search input value
    const [search, setSearch] = useState("");

    //store selected category
    const [category, setCategory] = useState("All");

    //extract unique categories for filter dropdown
    const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

    //filter products by category and search text
    const filteredProducts = products.filter(product => {
        const matchesCategory = category === "All" || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    //trigger fade-in animation for products on scroll
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

        const targets = document.querySelectorAll(".fade-in-on-scroll");
        targets.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [filteredProducts]);

    return (
        <div className="container">
            <div className="glass-container fade-in-on-scroll">
                <h2 className="products-page-header">Products</h2>

                {/*search bar and category filter*/}
                <div className="row mb-4">
                    <div className="col-md-6 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mb-2">
                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/*product display grid*/}
                <div className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="fade-in-on-scroll">
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center mt-5">
                            <p className="text-warning">No products found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
