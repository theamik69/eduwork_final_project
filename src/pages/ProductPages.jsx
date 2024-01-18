import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Nav";
import Products from "../components/Products";
import Recommended from "../components/Recomended";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

function ProductPages() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [discount, setDiscount] = useState(false);
  const [query, setQuery] = useState("");
  const [productData, setProductData] = useState([]);
  const location = useLocation();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = productData.filter((product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(data, selectedCategory, selectedGender, selectedStar, query, applyDiscount) {
    let filteredProducts = data;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        ({ category, gender, color, company, price, title, type, star }) =>
          category === selectedCategory ||
          gender === selectedCategory ||
          color === selectedCategory ||
          company === selectedCategory ||
          price === selectedCategory ||
          title === selectedCategory ||
          type === selectedCategory ||
          star === selectedCategory
      );
    }

    if (selectedGender) {
      filteredProducts = filteredProducts.filter(({ gender }) => gender === selectedGender);
    }

    if (selectedStar) {
      filteredProducts = filteredProducts.filter(({ star }) => star === selectedStar);
    }

    if (applyDiscount) {
      filteredProducts = filteredProducts.filter((product) => product.discount);
    }

    return filteredProducts.map(({ img, title, star, discount, reviews, prevPrice, price, company, category, id, type }) => (
      <Card key={Math.random()} img={img} title={title} star={star} discount={discount} reviews={reviews} prevPrice={prevPrice} price={price} company={company} category={category} id={id} type={type} />
    ));
  }

  const result = filteredData(productData, selectedCategory, selectedGender, selectedStar, query, discount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const genderParam = params.get("gender");
    const starParam = params.get("star");
    const discountParam = params.get("discount");

    setSelectedCategory(categoryParam);
    setSelectedGender(genderParam);
    setSelectedStar(starParam);
    setDiscount(discountParam === "true");
  }, [location.search]);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
}

export default ProductPages;
