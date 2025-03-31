import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  const getUserProfile = async () => {
    try {
        const res = await fetch("http://localhost:3002/api/profile", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  // ✅ สำคัญ: ให้ส่ง Cookies ไปด้วย
        });

        if (!res.ok) throw new Error(`Failed to fetch user profile: ${res.status}`);
        const data = await res.json();
        console.log("User Profile:", data);
        setUser(data);
    } catch (error) {
        console.error(error);
    }
};

  useEffect(() => {
    getUserProfile()
  },[])

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
          {user && (
              <div>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
            ) }
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
