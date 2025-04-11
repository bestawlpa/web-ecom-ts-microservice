import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ChangeEvent } from "react";

interface Product {
  product_name: string;
  images: string[];
  price: number;
  stock: number;
}

interface Item {
  itemId: string;
  productId: string;
  product: Product;
  quantity: number;
}

const CheckoutConfirmationOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectItems }: { selectItems: Item[] } = state;
  console.log(selectItems);
  
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    firstName: "First",
    lastName: "Last",
    address: "Address",
    phoneNumber: "191",
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  return (
    <div className="w-screen h-screen flex flex-col bg-[#E5E1DA]">
      <Header />
      <main className=" flex-grow overflow-y-auto w-full h-full flex justify-center px-40 py-8">
        <div className=" w-[820px] h-full bg-white p-6 rounded-lg flex justify-center items-center">
          <div className=" w-[820px] h-full overflow-hidden flex justify-between">
        
            <div className=" w-[440px] h-full py-4 pr-4 ">
              <h1>Shopping Information</h1>
              <div className=" w-full flex justify-between">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className=" h-10 p-2 my-4 rounded-md outline-none border-2 border-gray-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="  h-10 p-2 my-4 rounded-md outline-none border-2 border-gray-500"
                />
              </div>
              <div className=" w-full">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className=" h-10 w-full p-2 my-4 rounded-md outline-none border-2 border-gray-500"
                />
              </div>
              <div className=" w-full">
                <input
                  type="tell"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className=" h-10 w-full p-2 my-4 rounded-md outline-none border-2 border-gray-500"
                />
              </div>

              <div className=" w-full flex justify-center mt-8">
                <button
                  // onClick={confirm}
                  className=" px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Confirm Order
                </button>
              </div>
            </div>

            <div className=" w-[320px] h-full overflow-auto bg-[#F5F5F5] rounded-lg p-3 ">
              <h1 className=" mb-4 pt-1">Order Summary</h1>
              {selectItems.map((item) => (
                <div
                  key={item.itemId}
                  className=" w-full h-[80px] flex items-center py-2  border-b-2 border-gray-300"
                >
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className=" w-12 h-12 object-fill rounded-full border-2 border-slate-100 "
                  />
                  <div className=" flex flex-col pl-6 w-full">
                    <p className="  line-clamp-1">{item.product.product_name}</p>
                    <div className=" flex justify-between">
                      <p>×{item.quantity}</p>
                      <p>
                        <span className=" text-red-600">
                          {(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        ฿
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutConfirmationOrder;