/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPages from "./pages/ProductPages";
import ProductOverview from "./pages/ProductOverview";
import OrderDetail from "./pages/OrderDetail";
import ShippingPage from "./pages/ShippingPage";
import OrderSuccess from "./pages/orderSuccess";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPages />} />
        <Route path="/products-overview/:id" element={<ProductOverview />} />
        <Route path="/order-detail" element={<OrderDetail />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
