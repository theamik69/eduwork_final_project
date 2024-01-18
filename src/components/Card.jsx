/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import { BsFillBagFill } from "react-icons/bs";
import { IoMdPricetag } from "react-icons/io";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Card = ({ img, title, star, discount, reviews, prevPrice, price, id }) => {
  return (
    <>
      <section className="card">
        <Link to={`/products-overview/${id}`}>
          {discount && (
            <div className="flex flex-row text-red-600 font-medium mb-2">
              <IoMdPricetag className="mr-2" />
              <span>% On sale</span>
            </div>
          )}
          <img src={img} alt={title} className="card-img" />
          <div className="card-details">
            <h3 className="card-title">{title}</h3>
            <section className="card-reviews">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <GoStarFill key={rating} className={classNames(star > rating ? "text-yellow-400" : "text-gray-200", "h-4 w-4 flex-shrink-0")} aria-hidden="true" />
                  ))}
                </div>
                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{reviews} reviews</p>
              </div>
            </section>
            <section className="card-price">
              <div className="price flex gap-1">
                <p>$</p>
                <del>{prevPrice}</del> {price}
              </div>
              <div className="bag">
                <BsFillBagFill className="bag-icon" />
              </div>
            </section>
          </div>
        </Link>
      </section>
    </>
  );
};

export default Card;
