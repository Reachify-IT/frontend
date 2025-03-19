import { Link } from "react-router-dom";
// import notfound from "../assets/not.jpg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-6">
        {/* <div className="w-48">
            <img src={notfound} alt=""  className="w-full h-full "/>
        </div> */}
      <h1 className="text-9xl font-bold text-violet-800 ">404</h1>
      <p className="text-3xl mt-2 text-yellow-500">Oops! Page not found.</p>
      <p className="text-gray-500 mt-1 text-xl">The page you're looking for doesn't exist or was moved.</p>
      <Link
        to="/home"
        className="mt-6 px-6 py-3 bg-transparent text-red-500 font-semibold rounded-lg hover:underline transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
