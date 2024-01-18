// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { BsBasketFill } from "react-icons/bs";
import SearchCart from "./searchCart";
import ShoppingCard from "./ShoppingCard";

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [showSearchCart, setShowSearchCart] = useState(false);
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const cart = useSelector((state) => state.cart.data);

  const handleScroll = () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const filteredData = data.filter(
          (item) => item.title.toLowerCase().includes(searchValue.toLowerCase()) || item.type.toLowerCase().includes(searchValue.toLowerCase()) || item.company.toLowerCase().includes(searchValue.toLowerCase())
        );

        setSearchResults(filteredData);
        setShowSearchCart(searchValue.trim() !== "" && filteredData.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchValue]);
  return (
    <div>
      <nav className="navbar fixed top-0 left-0 right-0 z-[100] w-full bg-white flex flex-col flex-wrap items-center py-2 px-4 lg:flex-nowrap lg:justify-start lg:py-4 justify-center" data-te-navbar-ref>
        <div className="flex flex-row justify-center gap-64 items-center w-full max-w-screen-xl mx-auto">
          <div className="ml-20">
            <a href="" className="text-s tracking-[.4rem] text-black font-bold">
              DNMK
            </a>
          </div>
          <ul className="flex gap-6">
            <a href="/products?category=new" className="text-s tracking-[.4rem] text-black hover:font-bold">
              New
            </a>
            <li>
              <a href="/products?gender=man" className="text-s tracking-[.4rem] text-black hover:font-bold">
                Man
              </a>
            </li>
            <li>
              <a href="/products?gender=woman" className="text-s tracking-[.4rem] text-black hover:font-bold">
                Woman
              </a>
            </li>
          </ul>
          <div className="flex items-center">
            <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64 border-solid border-slate-200 border-2 p-2 rounded-2xl" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <FaSearch className="text-slate-600 text-xl" />
            <button className="relative ml-5" onClick={() => setShowShoppingCart(!showShoppingCart)}>
              <BsBasketFill className="text-slate-600 text-xl hover:text-2xl" />
              {cart.length > 0 && <span className="absolute -top-3 -right-2 rounded-full bg-red-500 px-1 py-0.5 text-[10px] font-bold text-white">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>
      <div className="fixed z-[100] p-0 m-0 w-full">{showSearchCart && <SearchCart data={searchResults} />}</div>
      <div className="fixed z-[100] p-0 m-0 w-full">{showShoppingCart && <ShoppingCard />}</div>
    </div>
  );
}

export default Navbar;
