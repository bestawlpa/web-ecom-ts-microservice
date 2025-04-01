import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { handleLogout } from "../controllers/LogoutController";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser} = useSelector((state: RootState) => state.user)

  return (
    <div className=" bg-[#FFFFFF] w-full h-full p-4 rounded-lg flex flex-col justify-between">
      <div>
        <div className=" h-12 flex justify-start items-center">
          <h1>My Profile</h1>
        </div>
        <div className=" h-12 flex justify-start items-center">
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
          onClick={() => handleLogout(dispatch, navigate)}
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
