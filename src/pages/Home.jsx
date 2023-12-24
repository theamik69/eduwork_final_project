/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "../components/carousel";
import Navbar from "../components/Navbar";
import Sale from "../components/Sale";
import CategoryProducts from "../components/CategoryProducts";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <Carousel />
        <Sale />
        <CategoryProducts />
      </div>
    </>
  );
}
