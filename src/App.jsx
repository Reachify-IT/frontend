import { BrowserRouter, Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./compnents/Footer";
import { Navbar } from "./compnents/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import { HomePage } from "./pages/HomePage";
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
import FolderData from "./compnents/FolderData";
import NotFound from "./compnents/NotFound";
import ResetPass from "./pages/ResetPass";
import ForgotPassword from "./pages/ForgetPassword";
import PrivacyPolicy from "./compnents/PrivacyPolicy";
import TermAndConditions from "./compnents/TermAndConditions";
import RefundPolicy from "./compnents/RefundPolicy";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Use inside <BrowserRouter>
  const dispatch = useDispatch();
  const isLandingPage = location.pathname === "/" || location.pathname === "/privacy-policy" || location.pathname === "/terms-and-conditions" || location.pathname === "/refunds-policy";

  const token = localStorage.getItem("accessToken");

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


        <Route path="/login" element={token ? <Navigate to="/home" replace /> : <LoginPage />} />

        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/imap-config" element={<ProtectedRoute element={<ImapConfig />} />} />
        <Route path="/payment-status" element={<ProtectedRoute element={<PaymentStatus />} />} />
        <Route path="/folder-data/:id" element={<ProtectedRoute element={<FolderData />} />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />

        <Route path="/forgot-password" element={token ? <Navigate to="/home" replace /> : <ForgotPassword />} />
        <Route path="/reset-password/:token" element={token ? <Navigate to="/home" replace /> : <ResetPass />} />



        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermAndConditions />} />
        <Route path="/refunds-policy" element={<RefundPolicy />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isLandingPage && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}


function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) return; // Don't connect if there's no user

    // Connect socket with user ID
    socketService.connect(user._id);

    // Listen for notifications
    const handleNotification = (data) => {
      dispatch(addNotification(data.message));
      console.log("New Notification:", data.message);

      if (Notification.permission === "granted") {
        new Notification("New Notification", { body: data.message });
      }
    };

    socketService.listen("notification", handleNotification);

    return () => {
      socketService.disconnect();
    };
  }, [user, dispatch]); // Depend on user and dispatch

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
