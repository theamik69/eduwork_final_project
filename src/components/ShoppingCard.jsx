/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartItem } from "../redux/slices/cartSlice";
import { MdDeleteForever } from "react-icons/md";

function ShoppingCard() {
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleDeleteCartItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    return dispatch(deleteCartItem(itemId));
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      return cart.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.qty, 0);
    };
    setTotalPrice(calculateTotalPrice());
  }, [cart]);

  return (
    <div className="absolute top-[-20px] right-72 m-0 p-0 bg-transparent">
      <div className="flex justify-center">
        <div className="relative ">
          <div className="absolute w-full rounded-b border-t-0 z-10">
            < div className="shadow-2xl w-64 h-96 overflow-auto bg-transparent rounded-2xl">
              {cart.map((item) => (
                <div className="p-2 mt-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100" key={item.id}>
                  <Link to={`/products-overview/${item.productId}`} className="flex flex-row">
                    <div className="w-14 mr-2">
                      <img src={item.image} alt="img product" />
                    </div>
                    <div className="flex-auto text-sm w-32">
                      <div className="font-bold">{item.title}</div>
                      <div className="text-gray-400">size: {item.size}</div>
                      <div className="text-gray-400">qty: {item.qty}</div>
                    </div>
                  </Link>

                  <div className="flex flex-col w-18 font-medium items-end">
                    <button type="button" onClick={() => handleDeleteCartItem(item.id)} className="w-5 h-5 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                      <MdDeleteForever className="w-5 h-5" />
                    </button>
                    $ {item.totalPrice}
                  </div>
                </div>
              ))}
              <Link to={`/shipping?id=${Date.now()}`}>
                <div className="p-4 justify-center flex bg-slate-200">
                  <button
                    className="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-700 hover:text-teal-100 
        bg-teal-100 
        text-teal-700 
        border duration-200 ease-in-out 
        border-teal-600 transition"
                  >
                    Checkout $ {totalPrice.toFixed(2)}
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="h-32"></div>
    </div>
  );
}

export default ShoppingCard;
