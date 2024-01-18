import recomImage from "../assets/images/recom.jpg";
import onSaleImage from "../assets/images/onSale.jpg";
import newProductImage from "../assets/images/new.jpg";

function CategoryProducts() {
  return (
    <div className="h-[450px] flex gap-5 justify-center items-center mt-10 mb-10">
      <div
        className="w-[550px] h-[450px] flex flex-col rounded-sm bg-recom hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:rounded-[20px] transition duration-300 ease-in-out"
        style={{
          background: `url(${recomImage}) center no-repeat`,
          backgroundSize: "cover",          
        }}
      >
        <h1 className="text-4xl font-semibold ml-10 mt-8">Recommended <br /> Product</h1>
        <p className="ml-10 mt-1">Discover our top-rated products, highly recommended by satisfied consumers.</p>
        <div className="flex item-center mt-10 ml-10">
          <a href="/products?star=5" className="border-2 p-2 rounded-lg bg-red-700 text-white font-semibold border-stone-50">Shop now</a>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div
          className="w-[550px] h-[215px] flex flex-col rounded-sm hover:bg-opacity-70 transition duration-300 ease-in-out"
          style={{
            background: `url(${newProductImage}) center no-repeat`,
            backgroundSize: "auto",
          }}
        >
          <h1 className="text-4xl font-semibold ml-10 mt-8">New Arrival</h1>
          <p className="ml-10 mt-1">New released products with a contemporary style.</p>
          <div className="flex item-center mt-10 ml-10">
            <a href="/products?category=new" className="border-2 p-2 rounded-lg bg-red-700 text-white font-semibold border-stone-50">Shop now</a>
          </div>
        </div>
        <div
          className="w-[550px] h-[215px] flex flex-col rounded-sm hover:bg-opacity-70 transition duration-300 ease-in-out"
          style={{
            background: `url(${onSaleImage}) center no-repeat`,
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-4xl font-semibold ml-10 mt-8">Sale</h1>
          <p className="ml-10 mt-1">Various quality shoes with attractive discounts.</p>
          <div className="flex item-center mt-10 ml-10">
            <a href="/products?discount=true" className="border-2 p-2 rounded-lg bg-red-700 text-white font-semibold border-stone-50">Shop now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
