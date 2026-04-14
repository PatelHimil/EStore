import React, { useEffect, useState, useRef } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(product => {
        const matchesCategory = category === "All" || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // CLOSE DROPDOWN ON OUTSIDE CLICK
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // FADE ANIMATION
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        const targets = document.querySelectorAll(".fade-in-on-scroll");
        targets.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [filteredProducts]);

    return (
        <div className="container">
            <div className="glass-container fade-in-on-scroll">

                <h2 className="products-page-header text-center mb-4">Products</h2>

                <div className="row mb-4">

                    {/* SEARCH */}
                    <div className="col-md-6 mb-3">
                        <div className="form-group with-icon">
                            <i className="bi bi-search"></i>
                            <input
                                type="text"
                                placeholder=" "
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <label>Search products...</label>
                        </div>
                    </div>

                    {/* CUSTOM DROPDOWN */}
                    <div className="col-md-6 mb-3">
                        <div
                            className={`form-group with-icon select-group ${open ? "open" : ""}`}
                            ref={dropdownRef}
                        >
                            <i className="bi bi-filter"></i>

                            <div
                                className={`custom-dropdown ${open ? "open" : ""}`}
                                onClick={() => setOpen(!open)}
                            >
                                {category}
                                <span className="dropdown-arrow">▾</span>
                            </div>

                            <label>Category</label>

                            {open && (
                                <div className="dropdown-menu-custom">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            className={`dropdown-item-custom ${cat === category ? "active" : ""}`}
                                            onClick={() => {
                                                setCategory(cat);
                                                setOpen(false);
                                            }}
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* PRODUCTS */}
                <div className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="fade-in-on-scroll">
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center mt-5">
                            <p className="text-warning fs-5">
                                No products found matching your search or category.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProductsPage;