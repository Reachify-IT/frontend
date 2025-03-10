import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./compnents/Footer";
import { Navbar } from "./compnents/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import { HomePage } from "./pages/HomePage";
import ForgetPass from "./pages/ForgetPass";
import Landinpage from "./pages/Landinpage";
import { ToastContainer } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../features/notificationSlice";
import socketService from "../features/socketService";
import { useEffect } from "react";
import PaymentStatus from "./compnents/PaymentStatus";


import { logout } from "../features/userSlice";
import ProtectedRoute from "./compnents/ProtectedRoute";
import BulkEmailForm from "./compnents/EmailForm";
import ImapConfig from "./compnents/ImapConfig";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Use inside <BrowserRouter>
  const dispatch = useDispatch();
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expiresAt = localStorage.getItem("tokenExpiry");
      if (expiresAt && new Date().getTime() > Number(expiresAt)) {
        console.log("Token expired. Logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpiry");
        dispatch(logout());
        navigate("/login"); // ✅ Now it works inside <Router>
      }
    };

    checkTokenExpiration(); // Check on initial load

    const interval = setInterval(checkTokenExpiration, 5000); // Check every 1 minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch, navigate]);

  return (
    <>
      {!isLandingPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Landinpage />} />
        <Route path="/Welcome" element={<WelcomePage />} />
        <Route path="/email-page" element={<BulkEmailForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/imap-config" element={<ImapConfig />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/forget-password" element={<ForgetPass />} />
      </Routes>
      {!isLandingPage && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    socketService.connect(user?._id);

    socketService.listen("notification", (data) => {
      dispatch(addNotification(data.message));

      if (Notification.permission === "granted") {
        new Notification("New Notification", { body: data.message });
      }
    });

    return () => {
      socketService.disconnect();
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout /> {/* ✅ Now `useNavigate()` is inside <BrowserRouter> */}
    </BrowserRouter>
  );
}

export default App;
