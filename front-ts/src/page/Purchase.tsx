import { Link, Outlet, useLocation } from "react-router-dom";

const Purchase = () => {
  const location = useLocation();

  const isActive = (path:string) => {
    // ตรวจสอบหน้าเริ่มต้นให้ border-bottom ขึ้นที่ "topay"
    if (location.pathname === "/profile/purchase" && path === "topay") {
      return true;
    }
    return location.pathname.includes(path);
  };

  return (
    <div className="bg-[#FFFFFF] w-full h-full py-4 rounded-lg flex flex-col justify-between">
      <div>
        <div className="flex w-full h-[40px] justify-between">
          <Link
            to="topay"
            className={`${
              isActive("topay") ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <div className=" w-[160px] h-full  flex justify-center items-center text-lg font-semibold">
              To Pay
            </div>
          </Link>

          <Link
            to="toship"
            className={`${
              isActive("toship") ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <div className=" w-[160px] h-full flex justify-center items-center text-lg font-semibold">
              To Ship
            </div>
          </Link>

          <Link
            to="toreceive"
            className={`${
              isActive("toreceive") ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <div className=" w-[160px] h-full flex justify-center items-center text-lg font-semibold">
              To Receive
            </div>
          </Link>

          <Link
            to="completed"
            className={`${
              isActive("completed") ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <div className=" w-[160px] h-full  flex justify-center items-center text-lg font-semibold">
              Completed
            </div>
          </Link>

          <Link
            to="cancelled"
            className={`${
              isActive("cancelled") ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <div className=" w-[160px] h-full  flex justify-center items-center text-lg font-semibold">
              Cancelled
            </div>
          </Link>
        </div>
      </div>

      <div style={{ flex: 1, padding: "10px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Purchase;
