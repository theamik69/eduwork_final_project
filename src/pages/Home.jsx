/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "../components/carousel";
import Navbar from "../components/Navbar";
import Sale from "../components/Sale";
import Category from "../components/Category";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <Carousel />
        <Sale />
        <Category />
      </div>
    </>
  );
}
