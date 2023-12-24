import { Data } from "../constants/data";
import Card from "./Card";

const Sale = () => {
  return (
    <div className="border-2 mt-10">
      <h1 className="text-black text-[50px] font-semibold">On Sale</h1>
      <div className="flex">
      {Data.filter(item => item.discount).map((item) => (
          <Card key={Math.random()} img={item.img} title={item.title} star={item.star} discount={item.discount} reviews={item.reviews} prevPrice={item.prevPrice} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default Sale;
