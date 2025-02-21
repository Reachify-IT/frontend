import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Reachify (32).png";
import { FaPowerOff } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";



export function Navbar() {

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BackendURL}/api/auth/logout`);

      dispatch(logout());
      localStorage.removeItem("accessToken");
      navigate("/login");

      // ✅ Success Toast (Blue Theme)
      toast.info("Logged out successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <FaCheckCircle  className="text-blue-500 h-16 w-16"/>,
        theme: "light",
      });

    } catch (error) {
      console.error("Logout error:", error);

      // ❌ Error Toast (Red Theme)
      toast.error("Logout failed! Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        style: { backgroundColor: "#fff", color: "#DC3545" }, // White background with red text
        progressStyle: { backgroundColor: "#DC3545" }, // Red progress bar
      });
    }
  };


  return (
    <div className="fixed top-0 z-50 flex items-center px-10 py-4 w-full">
      <div className="flex justify-between w-full items-center">
        <Link to="/" >
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            <p className="font-semibold text-lg">Loomify</p>
          </div>
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <p className="font-semibold text-lg whitespace-nowrap capitalize">Hi, {user?.username}</p>
            <div className="relative cursor-pointer h-16 w-16 flex items-center justify-center group">
              {user?.username ? (
                <h1 className="h-12 w-12 object-contain rounded-full bg-white flex items-center justify-center font-bold text-xl">{user.username.charAt(0).toUpperCase()}</h1> // Show first letter of username
              ) : (
                <img
                  src="https://img.freepik.com/free-vector/man-profile-account-picture_24908-81754.jpg?t=st=1738946452~exp=1738950052~hmac=510be33af448b0a5d3394bd1af53887986f4572a3dee510c804bab3a3dfb6cca&w=740"
                  alt="User Avatar"
                  className="h-12 w-12 object-contain rounded-full"
                />
              )}
              <div className="-z-1 absolute top-3 h-0 w-12 overflow-hidden group-hover:h-28 transition-all duration-300 ease-in-out flex flex-col items-center justify-end rounded-3xl bg-blue-200 py-5 text-red-500">
                <button onClick={handleLogout} className=" cursor-pointer flex items-center flex-col">
                  <FaPowerOff className="mb-1" />
                  <h1 className="text-xs">Logout</h1>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
