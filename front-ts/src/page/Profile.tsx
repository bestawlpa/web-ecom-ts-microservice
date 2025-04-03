import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser} = useSelector((state: RootState) => state.user)
  
  const isActive = (path:string) => {
    if (location.pathname === "/profile" && path === "account") {
      return true;
    }
    return location.pathname.includes(path);
  };

  useEffect(() => {
      if (!currentUser) {
        navigate('/'); 
      }
    }, [currentUser]);

  if (!currentUser) {
    return <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#E5E1DA]">Loading...</div>; // หรือหน้าอื่นๆ ถ้าผู้ใช้ไม่ได้ล็อกอิน
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-[#E5E1DA]">
      <Header />
      <main className="flex-grow overflow-y-auto flex justify-center px-40 ">
        <div className=" w-[1000px] flex my-4">
          <div className=" w-[200px]  flex flex-col items-center py-4 ">
            <Link
              to="account"
              className={`${isActive("account") ? "text-red-600" : ""}`}
            >
              <div className=" w-[80px] h-12 flex justify-start items-center text-xl font-semibold">
                Account
              </div>
            </Link>

            <Link
              to="purchase"
              className={`${isActive("purchase") ? "text-red-600" : ""}`}
            >
              <div className=" w-[80px] h-12 flex justify-start items-center text-xl font-semibold">
                Purchase
              </div>
            </Link>
          </div>

          <div style={{ flex: 1 }}>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
