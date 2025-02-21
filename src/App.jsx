import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import styles for react-toastify
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



function Layout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Landinpage />} />
        <Route path="/Welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/forget-password" element={<ForgetPass />} />
      </Routes>
      {!isLandingPage && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function App() {

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);

  useEffect(() => {
    socketService.connect();

    socketService.listen("notification", (data) => {
      dispatch(addNotification(data.message));

      // Show browser notification
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
      <Layout />
    </BrowserRouter>
  );
}

export default App;
