import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../reduces/productSlice";
import { AppDispatch, RootState } from "../store";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.products)
  const { currentUser } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate();
  const server: string = import.meta.env.VITE_SERVER3;

  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);
    
  const handleAddToCart = async (productId: string) => {
    if (!currentUser) {
      alert("กรุณา login ก่อนเพิ่มสินค้าในตะกร้า");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${server}api/addCart`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser._id,  
          items: [
            {
              productId,
              quantity: 1,
            },
          ],
        }),
      });

      if (response.ok) {
        alert("เพิ่มสินค้าในตะกร้าเรียบร้อยแล้ว!");
      } else {
        return await response.json();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มสินค้าในตะกร้า");
    }
  };

  
  return (
    <div className="w-screen h-screen flex flex-col bg-[#FFFFFF]">
      <Headers />
      <main className=" flex-grow overflow-y-auto flex justify-center px-40  bg-[#E5E1DA]">
        
      <div className="  my-10 ">
          <div className=" grid grid-cols-4  pb-10 gap-x-8 gap-y-6">
            {products.map((e) => (
              <div
                key={e._id}
                className="w-[260px] bg-white border rounded-[4px]  border-gray-200 shadow "
              >
                <Link to={`/product/${e._id}`}>
                  <img
                    className="p-8 rounded-t-lg"
                    src={Array.isArray(e.images) ? e.images[0] : e.images}
                    alt="product image"
                  />
                </Link>
                <div className="px-5 pb-5">
                  <Link to={`/product/${e._id}`}>
                    <div className="flex flex-col justify-between h-14">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 line-clamp-2">
                        {e.product_name}
                      </h5>
                    </div>
                  </Link>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      {e.ratings}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      ฿{e.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(e._id)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
