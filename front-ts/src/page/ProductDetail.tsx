import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "../reduces/productSlice";
import { AppDispatch, RootState } from "../store";
import Headers from "../components/Header";
import Footer from "../components/Footer";

const ProductDetail = () => {
    const { id } = useParams<string>();
    const dispatch = useDispatch<AppDispatch>();
    const { currentProduct, loading } = useSelector((state: RootState) => state.product);
    const [mainImage, setMainImage] = useState<string>("");
    const [thumbnails, setThumbnails] = useState<string | string[]>([]);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [openBuy, setOpenBuy] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch])

    const handleThumbnailClick = (clickedImage:string ) => {
        if (Array.isArray(thumbnails)) {
            const newThumbnails = thumbnails
                .filter((image) => image !== clickedImage) 
                .concat(mainImage); 
            setMainImage(clickedImage);
            setThumbnails(newThumbnails); 
        }
    };

    useEffect(() => {
        if (currentProduct && currentProduct.images) {
            setMainImage(currentProduct.images[0]);
            setThumbnails(currentProduct.images.slice(1, 3));
        }
    }, [currentProduct]);

    const handleReadmore = () => {
        setIsExpanded(!isExpanded);
    };
    
    const handleButtonOpen = () => {
        setOpenBuy(!openBuy);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <div className="w-screen h-screen flex flex-col bg-[#FFFFFF]">
      <Headers />
      <main className=" flex-grow overflow-y-auto flex justify-center px-40  w-full bg-[#E5E1DA]">
        <div className=" my-6 w-[780px] h-[515px] p-4 flex justify-between items-center mx-40 bg-white rounded-xl">
          <div
            id="gally"
            className=" grid gap-4 justify-items-start w-[400px] h-full "
          >
            <div className="flex justify-center items-center h-full">
              <img
                className=" h-[292px] w-[370px] rounded-lg object-cover shadow-md"
                src={mainImage}
                alt="Main"
              />
            </div>

            <div className="flex justify-center h-full">
              <div className="grid grid-cols-2 gap-5">
                {Array.isArray(thumbnails) && thumbnails.map((thumbnail: string, index: number) => (
                    <div 
                        key={index}
                        onClick={() => handleThumbnailClick(thumbnail)}
                    >
                        <img
                            className=" h-[175px] w-[175px] rounded-lg object-cover cursor-pointer shadow-md"
                            src={thumbnail}
                            alt="product"
                        />
                    </div>
                ))}
              </div>
            </div>
          </div>
          <div
            id="content"
            className=" w-[350px] h-full bg-[#EEEEEE] rounded-lg p-4 overflow-y-auto"
          >
            {currentProduct && (
              <div className=" flex flex-col justify-between h-full">
                <div className="  ">
                  <h1 className=" font-extrabold text-xl text-[#16423C] overflow-hidden text-ellipsis break-words h-[50px] leading-[24px] line-clamp-2">
                    {currentProduct.product_name}
                  </h1>
                  <div className=" flex">
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <h1>{currentProduct.ratings}</h1>
                  </div>
                  <p>Price: ${currentProduct.price}</p>

                  <div
                    className={`text-base text-gray-600 ${
                      isExpanded ? "h-auto" : "h-[94px]"
                    } ${isExpanded ? "" : "line-clamp-4"}`}
                  >
                    <p className=" font-semibold text-base">
                      {currentProduct.description}
                    </p>
                  </div>

                  {!isExpanded && currentProduct.description.length > 173 && (
                    <button
                      className="text-blue-500 mt-2 hover:text-blue-700"
                      onClick={handleReadmore}
                    >
                      Read more
                    </button>
                  )}
                </div>

                <div className=" w-full h-[120px] flex items-end px-6">
                  {!openBuy ? (
                    <div className=" mt-4 mb-3 w-full h-[80px] flex flex-col justify-between items-center">
                      <button
                        // onClick={() =>
                        //   handleAddCart(
                        //     currentProduct._id,
                        //     currentProduct.product_name,
                        //     currentProduct.price,
                        //     currentProduct.images[0],
                        //     currentProduct.stock
                        //   )
                        // }
                        className=" w-[200px] h-[35px] bg-blue-500 font-extrabold text-xl text-white rounded-md "
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={handleButtonOpen}
                        className=" w-[200px] h-[35px]  bg-green-500 font-extrabold text-xl text-white rounded-md"
                      >
                        Buy Now
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 w-full h-full bg-white flex flex-col justify-between rounded-md">
                      <div className=" w-full flex justify-between ">
                        <div className="w-[165px] flex justify-end opacity-30">
                          <h1>
                            stock : <span>{currentProduct.stock}</span>
                          </h1>
                        </div>
                        <button
                          onClick={handleButtonOpen}
                          className="  w-[30px] h-[30px] flex items-center justify-center bg-white text-white rounded-full"
                        >
                          <img
                            src="/close-svgrepo-com.svg"
                            alt="close-icon"
                            className=" h-[25px]"
                          />
                        </button>
                      </div>
                      <div className=" flex w-full justify-center items-end pb-2">
                        <button
                        //   onClick={() => handleQuantityChange("decrement")}
                          className="  w-8 h-8 bg-red-700 text-white flex justify-center items-center text-xl font-semibold rounded"
                        >
                          <img
                            src="/minus-svgrepo-com.svg"
                            alt=""
                            className=" w-[25px]"
                          />
                        </button>
                        <div className=" mx-4 w-12 h-8  flex justify-center items-center rounded text-3xl  font-semibold">
                          {/* <h1>{quantityForBuy}</h1> */}
                        </div>
                        <button
                        //   onClick={() => handleQuantityChange("increment")}
                          className=" w-8 h-8 bg-red-700 text-white flex justify-center items-center text-xl font-semibold rounded"
                        >
                          <img
                            src="/plus-svgrepo-com (1).svg"
                            alt=""
                            className=" w-[25px]"
                          />
                        </button>
                      </div>

                      <div className=" pb-2 flex justify-center">
                        <button
                        //   onClick={handleChackout}
                          className=" w-[80px] h-[35px] bg-green-500 font-extrabold text-xl text-white rounded-md"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
    )
}

export default ProductDetail
