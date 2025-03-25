import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "../reduces/productSlice";
import { AppDispatch, RootState } from "../store";

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const currentProduct = useSelector((state: RootState) => state.product.currentProduct);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch])

    return(
        <div>
            {currentProduct && (
                <div className=" flex flex-col justify-between h-full">
                    <div className="  ">
                        <h1 className=" font-extrabold text-xl text-[#16423C] overflow-hidden text-ellipsis break-words h-[50px] leading-[24px] line-clamp-2">
                            {currentProduct.product_name}
                        </h1>
                    </div> 
                </div> 
            )}
        </div>
    )
}

export default ProductDetail
