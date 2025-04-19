//Developed by Himil Patel (SID - 8971713)
//Developed by Urvishkumar Jariwala (SID - 8962495)
//Developed by Vishva Patel (SID - 8987097)
//Developed by Neet Patel (SID - 8966335)

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";

const App = () => (
    <>
        {/*navbar always visible*/}
        <Navbar />

        {/*route configuration*/}
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/thankyou" element={<ThankYouPage />} />
        </Routes>

        {/*footer always visible*/}
        <Footer />
    </>
);

export default App;
