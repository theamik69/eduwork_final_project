import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { RadioGroup } from "@headlessui/react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const product = {
  breadcrumbs: [
    { id: 1, name: "Home", to: "/" },
    { id: 2, name: "Product", to: "/products" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductOverview() {
  const [selectedSize, setSelectedSize] = useState("36");
  const [quantity, setQuantity] = useState(1);
  const [maxAmount, setMaxAmount] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const selectedProducts = data.find((item) => item.id === id);
        setSelectedProduct(selectedProducts);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  const maxQuantity = selectedProduct.qty;

  const decrement = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const increment = (e) => {
    e.preventDefault();
    if (quantity < maxQuantity) {
      setQuantity((prevValue) => prevValue + 1);
    } else {
      setMaxAmount(true);
    }
  };

  const calculatedPrice = selectedProduct.price * quantity;

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link to={breadcrumb.to} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </Link>
                  <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {selectedProduct.title}
              </a>
            </li>
          </ol>
        </nav>

        <div className="flex mt-10">
          <div className="flex flex-auto w-2/5 justify-center items-center ">
            <div className="w-[500px]">
              <img src={selectedProduct.img} alt={selectedProduct.img} className="w-full object-cover object-center" />
            </div>
          </div>

          <div className="flex-auto w-2/5">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{selectedProduct.title}</h1>
            </div>

            <div className="py-10 lg:border-r border-gray-700 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{selectedProduct.description}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">$ {calculatedPrice}</p>
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <GoStarFill key={rating} className={classNames(selectedProduct.star > rating ? "text-yellow-400" : "text-gray-200", "h-6 w-6 flex-shrink-0")} aria-hidden="true" />
                    ))}
                  </div>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{selectedProduct.reviews} reviews</p>
                </div>
              </div>
              <form className="mt-10 mb-20">
                <div className="mt-10 w-64">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>
                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {selectedProduct.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size.name}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock ? "cursor-pointer bg-white text-gray-900 shadow-sm" : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                              {size.inStock ? (
                                <span className={classNames(active ? "border" : "border-2", checked ? "border-indigo-500" : "border-transparent", "pointer-events-none absolute -inset-px rounded-md")} aria-hidden="true" />
                              ) : (
                                <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                  <svg className="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <div className="mt-10 w-full">
                  <p className="text-xl tracking-tight text-gray-900 mb-5">Stock {selectedProduct.qty}</p>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-900 w-20">Quantity : </label>
                    <div className="flex flex-row w-28 rounded-lg relative bg-transparent mt-3 border-2">
                      <button onClick={(e) => decrement(e)} className="flex justify-center  items-center text-gray-500 hover:text-gray-700 w-10 rounded-l cursor-pointer mr-3">
                        <FaChevronCircleLeft />
                      </button>
                      <input
                        type="number"
                        className="focus:outline-none bg-transparent text-center w-8  font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex  text-gray-700 p-0 m-0"
                        name="custom-input-number"
                        value={quantity}
                        readOnly
                      />
                      <button onClick={(e) => increment(e)} className="flex justify-center  items-center text-gray-500 hover:text-gray-700 w-10 rounded-l cursor-pointer">
                        <FaChevronCircleRight />
                      </button>
                    </div>
                    {maxAmount && <p className="text-lime-600 mt-2">Maximum amount</p>}
                  </div>
                </div>
                <div className="flex gap-12 mr-10">
                  <Link
                    to={`/products`}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-red-600"
                  >
                    Cancle
                  </Link>
                  <Link
                    to={`/products`}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
                          const addCartItem = {
                            id: id,
                            qty: quantity,
                            size: selectedSize,
                            image: selectedProduct.img,
                            title: selectedProduct.title,
                            price: selectedProduct.price,
                            totalPrice: calculatedPrice,
                          };

                          const existingItemIndex = existingCart.findIndex((item) => item.id === addCartItem.id);
                          console.log(existingItemIndex);
                          if (existingItemIndex !== -1) {
                            existingCart[existingItemIndex] = addCartItem;
                          } else {
                            existingCart.push(addCartItem);
                          }

                          const storageSize = JSON.stringify(localStorage).length;
                          console.log("Current storage size:", storageSize);

                          localStorage.setItem("cart", JSON.stringify(existingCart));

                          dispatch(addToCart(addCartItem));
                        } catch (error) {
                          console.error("Error saving to local storage:", error);
                        }
                      }}
                    >
                      Add to bag
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
