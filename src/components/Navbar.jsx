/* eslint-disable no-unused-vars */
import React from "react";
import { FaSearch, FaRegUser } from "react-icons/fa";
import { BsBasketFill } from "react-icons/bs";

function Navbar() {
  return (
    <nav className="relative z-[100] w-full flex flex-wrap items-center justify-between mt-5 mb-5 h-12 lg:flex-nowrap lg:justify-start lg:py-4" data-te-navbar-ref>
      <div className="flex flex-row justify-between items-center w-full max-w-screen-xl mx-auto">
        <div className="ml-20">
          <a href="" className="text-s tracking-[.4rem] text-black font-bold">
            DNMK
          </a>
        </div>
        <ul className="flex gap-6">
          <li>
            <a href="">New</a>
          </li>
          <li>
            <a href="">Man</a>
          </li>
          <li>
            <a href="">Woman</a>
          </li>
          <li>
            <a href="">Accessories</a>
          </li>
        </ul>
        <div className="flex items-center">
          <form action="">
            <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64 mr-2" />
            <button>
              <FaSearch className="text-slate-600 text-xl" />
            </button>
          </form>
          <a href="">
            <FaRegUser className="text-slate-600 m-6 text-xl" />
          </a>
          <a href="" className="relative">
            <BsBasketFill className="text-slate-600 text-xl" />
            <span className="absolute -top-3 -right-2 rounded-full bg-red-500 px-1 py-0.5 text-[10px] font-bold text-white">1</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
