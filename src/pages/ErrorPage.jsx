/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-200 font-sans">
      <div className="h-screen w-full absolute flex items-center justify-center bg-modal">
        <div className="bg-white rounded shadow p-8 m-4 max-w-lg max-h-full text-center">
          <div className="mb-8">
            <p className="text-3xl">Sorry, this page is having issues. Please try again later..</p>
          </div>
          <Link to={`/`}>
            <button className="border-b text-red-700 border-red-700 hover:text-xl hover:border-b-2">Back to home page</button>
          </Link>
          <div className="flex justify-center">
            <button className="flex-no-shrink text-white py-2 px-4 rounded bg-teal hover:bg-teal-dark">Lets Go</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
