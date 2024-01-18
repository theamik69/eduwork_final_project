/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToShipping } from "../redux/slices/shippingSlice";
import { FaShippingFast } from "react-icons/fa";

export default function ShippingPage() {
  const [isOpenProvince, setIsOpenProvince] = useState(false);
  const [isOpenCity, setIsOpenCity] = useState(false);
  const [searchProvince, setSearchProvince] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [selectedProvince, setSelectedProvince] = useState({});
  const [provinceData, setProvinceData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [isOpenDistrict, setIsOpenDistrict] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [dataCourier, setDataCourier] = useState([]);
  const [dataCourierService, setDataCourierService] = useState([]);
  const [selectedCourierServiceIndex, setSelectedCourierServiceIndex] = useState(null);
  const [selectedCourierIndex, setSelectedCourierIndex] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [orderId, setOrderId] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderIdParam = params.get("id");

    setOrderId(orderIdParam);
  }, [location.search]);

  const toggleProvinceDropdown = (e) => {
    e.preventDefault();
    setIsOpenProvince(!isOpenProvince);
  };

  const toggleCityDropdown = (e) => {
    e.preventDefault();
    setIsOpenCity(!isOpenCity);
  };

  const toggleDistrictDropdown = (e) => {
    e.preventDefault();
    setIsOpenDistrict(!isOpenDistrict);
  };

  const handleInputProvince = (e) => {
    setSearchProvince(e.target.value.toLowerCase());
  };

  const handleInputCity = (e) => {
    setSearchCity(e.target.value.toLowerCase());
  };

  const handleInputDistrict = (e) => {
    setSearchDistrict(e.target.value.toLowerCase());
  };

  const handleProvinceSelect = (province, id) => {
    setSelectedProvince({ province, id });
    setIsOpenProvince(false);
  };

  const handleCitySelect = (city, id) => {
    setSelectedCity({ city, id });
    setIsOpenCity(false);
  };

  const handleDistrictSelect = (district, id) => {
    setSelectedDistrict({ district, id });
    setIsOpenDistrict(false);
  };

  const handleCourierSelect = (courier, index) => {
    console.log("courier :", courier);
    setSelectedCourier(courier);
    setSelectedCourierIndex(index);
  };

  const handleCourierServiceSelect = (cost, index) => {
    console.log("service :", cost);
    setDataCourierService(cost);
    setSelectedCourierServiceIndex(index);
  };

  useEffect(() => {
    fetch("https://demo.sistemtoko.com/province")
      .then((response) => response.json())
      .then((data) => {
        setProvinceData(data);
      })
      .catch((error) => {
        console.error("Error fetching province data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince.id) {
      fetch(`https://demo.sistemtoko.com/city/${selectedProvince.id}`)
        .then((response) => response.json())
        .then((data) => {
          setCityData(data);
        })
        .catch((error) => {
          console.error("Error fetching city data:", error);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity.id) {
      fetch(`https://demo.sistemtoko.com/subdistrict?id=${selectedCity.id}`)
        .then((response) => response.json())
        .then((data) => {
          setDistrictData(data);
        })
        .catch((error) => {
          console.error("Error fetching city data:", error);
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict.id) {
      fetch(`http://localhost:3000/ongkir`)
        .then((response) => {
          console.log("Raw response:", response);
          return response.json();
        })
        .then((data) => {
          console.log("Courier data:", data);
          setDataCourier(data);
        })
        .catch((error) => {
          console.error("Error fetching courier data:", error);
        });
    }
  }, [selectedDistrict]);

  return (
    <div>
      <div className="text-center mt-24">
        <div className="flex items-center justify-center">
          <svg fill="none" viewBox="0 0 24 24" className="w-20 h-20 text-blue-500" stroke="currentColor">
            <FaShippingFast />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight">Shipping</h2>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form className="w-full max-w-[1200px] bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap gap-10 -mx-3 mb-6 justify-center">
            <div className="flex flex-col justify-center">
              <h2 className="pb-5 text-xl font-bold">Recever</h2>
              <div className="flex gap-10 justify-center items-center">
                <div className="w-[550px]">
                  <div className="w-full md:w-full px-3 mb-6 border-b-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Name">
                      Name
                    </label>
                    <input className="block w-full bg-white text-gray-900 font-medium border-gray-900 rounded-lg py-3 px-3" type="text" required value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                  </div>
                  <div className="w-full md:w-full px-3 mb-6 border-b-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Phone">
                      Phone
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                      type="text"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[550px]">
                  <div className="w-full md:w-full px-3 mb-6 border-b-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Address">
                      Address
                    </label>
                    <input className="block w-full bg-white text-gray-900 font-medium border-gray-900 rounded-lg py-3 px-3" type="text" required value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
                  </div>
                  <div className="flex">
                    <div className="flex flex-col w-full md:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">Province :</label>
                      <div className="flex mt-2">
                        <div className="relative group">
                          <button
                            id="dropdown-button"
                            onClick={(e) => toggleProvinceDropdown(e)}
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                          >
                            <span className="mr-3">{selectedProvince.province || "Open Dropdown"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <div id="dropdown-menu" className={`absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${isOpenProvince ? "" : "hidden"}`}>
                            <input
                              id="search-input"
                              className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                              type="text"
                              placeholder="Search items"
                              autoComplete="off"
                              onChange={handleInputProvince}
                            />
                            {provinceData
                              .filter((item) => item.province.toLowerCase().includes(searchProvince))
                              .map((item) => (
                                <a key={item.province_id} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md" onClick={() => handleProvinceSelect(item.province, item.province_id)}>
                                  {item.province}
                                </a>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full md:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">City :</label>
                      <div className="flex mt-2">
                        <div className="relative group">
                          <button
                            id="dropdown-button"
                            onClick={(e) => toggleCityDropdown(e)}
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                          >
                            <span className="mr-3">{selectedCity.city || "Open Dropdown"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <div id="dropdown-menu" className={`absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${isOpenCity ? "" : "hidden"}`}>
                            <input
                              id="search-input"
                              className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                              type="text"
                              placeholder="Search items"
                              autoComplete="off"
                              onChange={handleInputCity}
                            />
                            {cityData
                              .filter((item) => item.city_name.toLowerCase().includes(searchCity))
                              .map((item) => (
                                <a key={item.city_id} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md" onClick={() => handleCitySelect(item.city_name, item.city_id)}>
                                  {item.city_name}
                                </a>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full md:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">District :</label>
                      <div className="flex mt-2">
                        <div className="relative group">
                          <button
                            id="dropdown-button"
                            onClick={(e) => toggleDistrictDropdown(e)}
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                          >
                            <span className="mr-3">{selectedDistrict.district || "Open Dropdown"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <div id="dropdown-menu" className={`absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${isOpenDistrict ? "" : "hidden"}`}>
                            <input
                              id="search-input"
                              className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                              type="text"
                              placeholder="Search items"
                              autoComplete="off"
                              onChange={handleInputDistrict}
                            />
                            {districtData
                              .filter((item) => item.subdistrict_name.toLowerCase().includes(searchDistrict))
                              .map((item) => (
                                <a
                                  key={item.subdistrict_id}
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                                  onClick={() => handleDistrictSelect(item.subdistrict_name, item.subdistrict_id)}
                                >
                                  {item.subdistrict_name}
                                </a>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full p-7">
              <h2 className="pb-5 text-xl font-bold">Select courier</h2>
              <div className="flex gap-4">
                {dataCourier &&
                  dataCourier.data &&
                  dataCourier.data.map((courier, index) => (
                    <button
                      type="button"
                      className={`border-2 shadow-md p-3 rounded-xl ${selectedCourierIndex === index ? "bg-green-300 border-4 border-slate-700" : "bg-transparent"}`}
                      onClick={() => handleCourierSelect(courier, index)}
                      key={courier.code}
                    >
                      <img src={courier.photo} alt={courier.name} />
                      <div className="flex gap-5 justify-center"></div>
                    </button>
                  ))}
              </div>
              <div className="flex mt-5 gap-5">
                {selectedCourier &&
                  selectedCourier.costs.map((cost, index) => (
                    <div className={`border-2 shadow-md p-3 rounded-xl bg-rose-50 ${selectedCourierServiceIndex === index ? "bg-green-300 border-4 border-slate-700" : "bg-rose-50"}`} key={cost.service}>
                      <h3 className="font-bold">{cost.service}</h3>
                      <p className="font-semibold">{cost.description}</p>
                      <p>Cost: {cost.cost[0].value}</p>
                      <p>Estimated Time: {cost.cost[0].etd} day</p>
                      <button
                        type="button"
                        className={`border-2 p-2 rounded-lg mt-4 font-semibold hover:font-bold ${selectedCourierServiceIndex === index ? "bg-green-400" : "bg-lime-500"}`}
                        onClick={() => handleCourierServiceSelect(cost, index)}
                      >
                        {selectedCourierServiceIndex === index ? "Selected" : "Select"}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <Link to={"/order-detail"}>
                <button
                  className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white rounded-xl"
                  type="submit"
                  onClick={() => {
                    const addShippingItem = {
                      id: orderId,
                      name: nameInput,
                      phone: phoneInput,
                      address: addressInput,
                      courier: dataCourier.data[selectedCourierIndex],
                      service: dataCourierService,
                    };

                    // Timpa data di dalam localStorage dengan data baru
                    localStorage.setItem("shipping", JSON.stringify(addShippingItem));

                    // Dispatch aksi addToShipping dengan data baru
                    dispatch(addToShipping(addShippingItem));
                    navigate("/order-detail"); // Langkah 3
                    window.location.reload();
                  }}
                >
                  Submit
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
