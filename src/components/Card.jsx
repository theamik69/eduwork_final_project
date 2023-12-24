/* eslint-disable react/prop-types */
import { BsFillBagFill } from "react-icons/bs";
import { IoMdPricetag } from "react-icons/io";

const Card = ({ img, title, star, discount, reviews, prevPrice, price }) => {
  return (
    <>
      <section className="card">
      {discount && (
          <div className="flex flex-row text-red-600 font-medium mb-2">
            <IoMdPricetag className="mr-2"/>
            <span>% On sale</span>
          </div>
        )}
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            {star}
            <span className="total-reviews">{reviews}</span>
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
      </section>
    </>
  );
};

export default Card;
