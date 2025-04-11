import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { Link } from "react-router-dom";

interface Product {
    product_name: string;
    images: string[];
    price: number;
    stock: number;
}

interface CartItem {
    _id: string;
    userId: string;
    items: {
        _id: string;
        productId: string;
        product: Product;
        quantity: number;
    }[];
}

type CartProductItem = {
    product: Product;
    quantity: number;
};

interface SelectedItem {
  itemId: string;
  productId: string;
  quantity: number;
  product: Product;
}

const Cart = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const server: string = import.meta.env.VITE_SERVER3;
    const [item, setItem] = useState<CartItem | null>(null);
	const [selectItems, setSelecItems] = useState<SelectedItem[]>([]);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
            return;
        }
        fetchCart();
    }, [currentUser]);

    const fetchCart = async () => {
        if (!currentUser) return;
            try {
                const response = await fetch(`${server}api/cart/${currentUser._id}`);
                if (!response.ok) {
                  throw new Error("Failed to fetch carts");
                }
                const data = await response.json();
                setItem(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setLoading(false);
            }
    };

	const handleRemoveItem = async (userId:string, itemId:string) => {
		try {
			const response = await fetch(
					`${server}api/cart/remove/${userId}/${itemId}`,
				{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				}
			);

			if (!response.ok) {
				throw new Error("ไม่สามารถลบรายการจากตะกร้าได้");
			}
	
			const updatedItems = item?.items?.filter((e) => e._id !== itemId) ?? [];
			setItem({
				_id: item?._id || '', 
				userId: item?.userId || '',  
				items: updatedItems
			});
		} catch (error) {
			 console.error("Error remove item:", error);
		}
    }

	const handleQuantityChange = (changedItem: CartProductItem, type: 'increment' | 'decrement') => {
        if (!item) return;
        const updatedItems = item.items.map((cartItem) => {
            if (cartItem.product.product_name === changedItem.product.product_name) {
                let newQuantity = cartItem.quantity;
                    if (type === "increment" && newQuantity < cartItem.product.stock) {
                      newQuantity += 1;
                    } else if (type === "decrement" && newQuantity > 1) {
                      newQuantity -= 1;
                    }
                    return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
        });
        setItem({ ...item, items: updatedItems });
    };

	const handleCheckboxChange = (itemId: string, productId: string, quantity: number, product: Product, isChecked: boolean) => {
		if (isChecked) {
			setSelecItems((e) => {
				const updatedItems = [...e, { itemId, productId, quantity, product }];
				console.log(updatedItems);
				return updatedItems;
			});
		} else {
			setSelecItems((e) => {
				const updatedItems = e.filter((item) => item.itemId !== itemId);
				console.log(updatedItems);
				return updatedItems;
			});
		}
	};

    return (
        <div className="w-screen h-screen flex flex-col bg-[#E5E1DA]">
            <Headers />
            <main className="flex-grow overflow-auto w-full h-full flex justify-center px-40">
                <div className="w-[850px] min-h-[520px] flex flex-col justify-between items-center py-4">
                      <h1 className="text-xl font-semibold mb-5 text-[#4A4747]">
                        Your shopping cart
                      </h1>
                    <div className="pb-2">
                        {loading ? (
							<div className="w-full flex justify-center mt-14 text-3xl text-red-700">
								<p>Loading...</p>
							</div>
                        ) : (
							<div className="">
								{item && item.items.length > 0 ? (
									<div 
										key={item._id}
										className=" w-[850px] h-full flex flex-col items-center my-4 overflow-hidden "
									>	
										{item.items.map((e) => (
											<div key={e._id} className="cart-item border-b-2 border-b-gray-400 py-6 flex">
												<div className="flex items-center w-[30px] ml-4">
													<input
														type="checkbox"
														className="w-4 h-4 accent-green-500 cursor-pointer"
														onChange={(event) => handleCheckboxChange(e._id, e.productId, e.quantity, e.product, event.target.checked)}
													/>
												</div>

												<div className=" flex w-[650px] justify-between h-full bg-[#94B49F] rounded-lg px-4 items-center">
													<div className=" w-[120px] h-full flex items-center justify-center">
														<img
															src={e.product.images[0]}
															alt={e.product.product_name}
															className=" w-[90px] h-[90px] rounded-full border-4 border-white object-fill"
														/>
													</div>

													<Link to={`/product/${e.productId}`}>
														<div className=" h-[120px] flex items-center w-[220px] ">
															<h1 className=" whitespace-nowrap overflow-hidden text-ellipsis font-semibold text-lg text-[#FBFBFB]">
																{e.product.product_name}
															</h1>
														</div>
													</Link>

													<div className=" flex items-center h-full w-[100px] ">
														<div className=" w-[60px] flex justify-end mr-2">
															<h1 className=" text-[#B8001F] font-semibold text-lg">
																{e.quantity}
															</h1>
														</div>

														<div className=" flex flex-col h-full w-[40px] justify-center">
															<button
																onClick={() => handleQuantityChange(e, 'increment')} 
																className=" w-[30px] h-[30px] bg-[#493F3D] flex justify-center items-center rounded-full mb-2"
															>
																<img
																	src="/plus-svgrepo-com (1).svg"
																	alt=""
																	className=" w-[25px]"
																/>
															</button>

															<button
																onClick={() => handleQuantityChange(e, 'decrement')} 
																className=" w-[30px] h-[30px] bg-[#493F3D] flex justify-center items-center rounded-full mt-2"
															>
																<img
																	src="/minus-svgrepo-com.svg"
																	alt=""
																	className=" w-[25px]"
																/>
															</button>
														</div>
													</div>

													<div className=" w-[100px] h-full flex justify-end items-center ">
														<h1 className=" text-[#FBFBFB] font-semibold text-lg">
															{(e.product.price * e.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
															<span className=" ml-2">฿</span>
														</h1>
													</div>
												</div>

												<div className=" w-[50px] flex justify-center items-center">
													<button
													  onClick={() =>
													    handleRemoveItem(item.userId, e._id)
													  }
													>
													<img
														src="./remove-svgrepo-com (1).svg"
														alt=""
														className=" w-[30px] h-[30px]"
													/>
													</button>
												</div>
											</div>
										))}
									</div>
							) : (
								<div className=" w-full flex justify-center">
									<img
										src="./cart-xmark-svgrepo-com.svg"
										alt=""
										className="w-[120px] h-[120px] mt-14"
									/>
								</div>
								)}
							</div>
                        )}
                    </div>

                    <div className="min-h-[50px] mt-4 w-full flex justify-center items-start">
						<button className="px-4 py-2 bg-red-700 rounded-lg text-white relative">
							Check Out
						</button>
					</div>
				</div>
            </main>
            <Footer />
        </div>
    );
};

export default Cart;

