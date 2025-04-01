import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { getUserProfile } from "../reduces/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { logoutUser } from "../reduces/userSlice";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, loading } = useSelector((state: RootState) => state.user)
  const server: string = import.meta.env.VITE_SERVER2;

  // useEffect(() => {
  //   dispatch(getUserProfile());
  // },[dispatch])

  useEffect(() => {
    if (currentUser) {
      console.log("home", currentUser);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await fetch(`${server}api/logout`, {
        method: "POST",
        credentials: "include",
      })
      console.log('success');
      dispatch(logoutUser());
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className=" bg-[#FFFFFF] w-full h-full p-4 rounded-lg flex flex-col justify-between">
      <div>
        <div className=" h-12 flex justify-start items-center">
          <h1>My Profile</h1>
        </div>
        <div className=" h-12 flex justify-start items-center">
          {/* <h1>
            Username <span>{currentUser.username}</span>
          </h1> */}
          {currentUser && (
              <div>
                 <p><strong>Username:</strong> {currentUser.username}</p>
                    <p><strong>Email:</strong> {currentUser.email}</p>
              </div>
            ) }
        </div>
      </div>
      <div className=" w-full flex justify-center">
        <button
          onClick={handleLogout}
          className=" w-16 h-10  text-white rounded flex justify-center items-center"
        >
          <img
            src="/logout-svgrepo-com.svg"
            alt=""
            className=" w-[25px] h-[25px]"
          />
        </button>
      </div>
    </div>
  );
};

export default Account;
