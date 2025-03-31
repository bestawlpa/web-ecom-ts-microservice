import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  
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
        </div>
      </div>
      <div className=" w-full flex justify-center">
        <button
          // onClick={handleLogout}
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
