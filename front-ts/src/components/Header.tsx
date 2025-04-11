import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../reduces/productSlice";
import { AppDispatch, RootState } from "../store";



const Header = () => {
  const [search, setSearch] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.products)

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  
    if (products.length === 0) {
        dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

 

  const filteredProducts = products.filter((product) =>
      product.product_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearch(""); // เคลียร์ค่าค้นหา
  };

  const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && e.target instanceof Node && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false); // ปิดช่องค้นหาเมื่อคลิกข้างนอก
      }
  };

  useEffect(() => {
    
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
          document.removeEventListener("mousedown", handleOutsideClick); 
      };
  }, []);

  return (
    <nav className="bg-gray-100 px-40 w-full border-gray-200 sticky top-0 "  role="banner">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse w-[300px]"
        >
          <img
            src="/one-one-svgrepo-com.svg"
            className="h-12"
            alt="Night Logo"
          />
          <span
            className="self-center text-4xl font-extrabold whitespace-nowrap text-[#091353]"
            style={{
              textShadow:
                "2px 2px 3px #0000FF, 0px 0px 6px #133E87, -4px -4px 2px #FEFF86",
            }}
          >
            Night Market
          </span>
        </Link>

        <div className="flex justify-center relative w-[300px]" ref={searchRef}>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <div className="sr-only">Search icon</div>
          </div>
          <input
            type="text"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-[#ffffff] focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 "
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
          />
          {search && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          {isSearchOpen && search && (
            <div className="w-[600px] min-h-[160px] absolute top-[34px] bg-white shadow-lg rounded-lg mt-1 overflow-hidden">
              {filteredProducts.length > 0 ? (
                <ul>
                  {filteredProducts.slice(0, 4).map((product) => (
                    <Link
                      to={`/product/${product._id}`}
                      key={product._id}
                      onClick={handleClearSearch}
                    >
                      <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        {product.product_name}
                      </div>
                    </Link>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-2 text-red-700">No products found</div>
              )}
            </div>
          )}
        </div>

        <div className=" flex justify-around py-4 w-[300px] ">
          <Link to={"/"}>
            <div className=" text-center py-3 px-3 rounded-full hover:bg-amber-300 ">
              <img
                src="/header/home-svgrepo-com (1).svg"
                alt=""
                className=" w-[25px] h-[25px]"
              />
            </div>
          </Link>
          <Link to={"/cart"}>
            <div className=" text-center py-3 px-3 rounded-full hover:bg-amber-300 ">
              <img
                src="/header/cart-svgrepo-com (1).svg"
                alt=""
                className=" w-[25px] h-[25px]"
              />
            </div>
          </Link>
          <Link to={"/profile"}>
            <div className=" text-center py-3 px-3 rounded-full hover:bg-amber-300 ">
              <img
                src="/header/profile-svgrepo-com.svg"
                alt=""
                className=" w-[25px] h-[25px]"
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
