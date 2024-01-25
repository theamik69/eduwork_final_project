import { useState } from "react";
import { useSelector } from "react-redux";
import ShoppingCard from "./ShoppingCard";
import { FaSearch } from "react-icons/fa";
import { BsBasketFill } from "react-icons/bs";
import PropTypes from "prop-types";

const Nav = ({ handleInputChange, query }) => {
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const cart = useSelector((state) => state.cart.data);
  return (
    <div className="flex justify-center item-center mt-6 w-full">
      <nav className="flex w-full justify-end mr-14 mt-5 z-[999]">
        <div className="flex justify-center items-center">
          <input className="bg-transparent focus:outline-none w-24 sm:w-64 border-solid border-slate-200 border-2 p-2 rounded-2xl" type="text" onChange={handleInputChange} value={query} placeholder="Enter your search shoes." />
          <FaSearch className="text-slate-600 text-2xl" />
        </div>
        <div className="flex ml-5">
          <button className="relative" onClick={() => setShowShoppingCart(!showShoppingCart)}>
            <BsBasketFill className="text-slate-600 text-xl hover:text-2xl" />
            {cart.length > 0 && <span className="absolute -top-3 -right-2 rounded-full bg-red-500 px-1 py-0.5 text-[10px] font-bold text-white">{cart.length}</span>}
          </button>
        </div>
      </nav>
      <div className="fixed z-[100] top-28 p-0 m-0 w-full">{showShoppingCart && <ShoppingCard />}</div>
    </div>
  );
};

Nav.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default Nav;
