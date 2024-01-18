/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStatusorder, setSelectedStatusOrder] = useState("");
  const [selectedPaymenMethod, setSelectedPaymenMethod] = useState("");
  const location = useLocation();
  const shipping = useSelector((state) => state.shipping.data);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get("status");
    const statusorderParam = params.get("statusorder");
    const paymenMethodParam = params.get("paymenMethod");

    setSelectedStatus(statusParam);
    setSelectedStatusOrder(statusorderParam);
    setSelectedPaymenMethod(paymenMethodParam);
  }, [location.search]);

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto flex justify-center items-center">
      <div className="flex justify-start items-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Order #{shipping.id} has been {selectedStatus} submitted
        </h1>
        <h2 className="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">Status: {selectedStatusorder}</h2>
        <h2 className="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">Payment Method: {selectedPaymenMethod}</h2>
        <h2 className="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">*The shipping code will be sent to your phone</h2>
        <Link to="/">
          <button className="mt-6 rounded-xl hover:font-bold md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
