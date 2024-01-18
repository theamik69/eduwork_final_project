import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchCart = ({ data }) => {
  return (
    <div className="absolute top-0 right-36 m-0 p-0  bg-slate-500 bg-opacity-40 rounded-xl">
      <div className="shadow-xl w-96">
        {data.map((item) => (
          <Link to={`/products-overview/${item.id}`} key={item.id}>
            <div className="m-2 flex rounded-3xl bg-white hover:bg-gray-100 cursor-pointer border-b-2 border-gray-100">
              <div className="w-12 m-5">
                <img src={item.img} alt="img product" />
              </div>
              <div className="flex-auto text-sm w-32">
                <div className="font-bold">{item.title}</div>
                <div className="truncate">{item.category}</div>
                <div className="text-gray-400">Qt: {item.qty}</div>
              </div>
              <div className="flex flex-col w-18 font-medium items-end">
                <div className="mr-5 mt-5">$ {item.price}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

SearchCart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SearchCart;
