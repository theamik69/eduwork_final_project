/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { clearCart } from "../redux/slices/cartSlice";

export default function OrderDetail() {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data);
  const shipping = useSelector((state) => state.shipping.data);

  useEffect(() => {
    const calculateTotalPrice = () => {
      return cart.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.qty, 0);
    };
    setTotalPrice(calculateTotalPrice());
  }, [cart]);

  const costValue = shipping.service.cost[0].value;

  const totalCost = totalPrice + costValue;

  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  }

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  const handleOrderSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: shipping.id,
          orderDetail: cart,
          totalCost: totalCost,
          customerName: shipping.name,
          customerPhone: shipping.phone,
          customerAddress: shipping.address,
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();

        const { status, statusOrder, paymentMethod } = jsonResponse;

        dispatch(clearCart());
        navigate(`/order-success?status=${status}&statusorder=${statusOrder}&paymenMethod=${paymentMethod}`);
      } else {
        console.error("Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #{shipping.id}</h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{formattedDate}</p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
            {cart.map((item) => (
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full" key={item.id}>
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <img className="w-full hidden md:block" src={item.image} alt="image-product" />
                  <img className="w-full md:hidden" src={item.image} alt="image-product" />
                </div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{item.title}</h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-sm dark:text-white leading-none text-gray-800">
                        <span className="dark:text-gray-400 text-gray-500">Size: </span> {item.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base dark:text-white xl:text-lg leading-6">$ {item.price}</p>
                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{item.qty}</p>
                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">$ {item.totalPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$ {totalPrice}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$ {costValue}</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">$ {totalCost}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping courier</h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-14 h-14">
                    <img className="w-full h-full" alt="logo" src={shipping.courier.photo} />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                      {shipping.service.service}
                      <br />
                      <span className="font-normal">{shipping.service.description}</span>
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">$ {costValue}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{shipping.name}</p>
                </div>
              </div>

              <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <FaPhoneAlt />
                <p className="cursor-pointer text-sm leading-5 ">{shipping.phone}</p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                  <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{shipping.address}</p>
                </div>
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                  <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{shipping.address}</p>
                </div>
              </div>
              <Link to={`/shipping?id=${shipping.id}`}>
                <div className="w-full flex justify-center items-center">
                  <button className="mt-6 rounded-xl hover:font-bold md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                    Edit details
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1200px] flex justify-center items-center mt-7">
        <button
          className="hover:bg-black hover:font-bold rounded-xl dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
          onClick={handleOrderSubmit}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}
