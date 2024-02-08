import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PropTypes from "prop-types";

const product = {
  breadcrumbs: [{ id: 1, name: "Home", to: "/" }],
};

const Recommended = ({ handleClick }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const uniqueCompanies = [...new Set(products.filter((item) => item.star == 5).map((item) => item.company))];

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }
  return (
    <>
      <div>
        <nav aria-label="Breadcrumb" className="ml-48 mt-24">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link to={breadcrumb.to} className="mr-2 text-xl font-medium text-sky-600">
                    {breadcrumb.name}
                  </Link>
                  <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a aria-current="page" className="mr-2 text-xl font-medium underline underline-offset-4 text-sky-600">
                Product
              </a>
            </li>
          </ol>
        </nav>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          {uniqueCompanies.map((company) => (
            <Button key={company} onClickHandler={handleClick} value={company} title={company} />
          ))}
        </div>
      </div>
    </>
  );
};

Recommended.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Recommended;
