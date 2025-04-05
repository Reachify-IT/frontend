import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import axios from "axios";
import Loader from "./Loader";
import PayPalButton from "./PayPalButton"; // You have this imported but not used
import { load } from "@cashfreepayments/cashfree-js"; // ✅ Added Cashfree SDK loader

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 0.01,
    looms: 2000,
    icon: <FaUser className="h-16 w-16 text-blue-700" />,
  },
  {
    id: "pro",
    name: "Pro",
    price: 2500,
    looms: 5000,
    icon: <HiUserGroup className="h-16 w-16 text-blue-700" />,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 5000,
    looms: 10000,
    icon: <FaRegBuilding className="h-14 w-14 text-blue-700" />,
  },
];

const PricingSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [planDetails, setPlanDetails] = useState("Trial");
  const [availableLoom, setAvailableLoom] = useState(0);
  const [cashfree, setCashfree] = useState(null);
  const { user } = useSelector((state) => state.user);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/auth/me`, {
        headers: { Authorization: token },
      });

      const user = response.data.user;
      const paymentHistory = user.paymentHistory;

      if (paymentHistory && paymentHistory.length > 0) {
        const latestPayment = paymentHistory.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        setPaymentStatus(latestPayment.status);
        setPlanDetails(user.planDetails);
        setAvailableLoom(user.videosCount);
      } else {
        setPaymentStatus(null);
        setPlanDetails("Trial");
        setAvailableLoom(0);
      }
    } catch (error) {
      console.error("🚨 Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cashfreeInstance = await load({ mode: "production" }); // Change to "production" in prod
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error("❌ Error initializing Cashfree:", error);
      }
    };
    initializeCashfree();
  }, []);

  const handlePaymentInitiate = async (plan) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BackendURL}/api/payments/initiate`,
        {
          orderId: `ORDER_${plan.id}_${Date.now()}`,
          amount: plan.price,
          planDetails: plan.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.success && response.data.payment_session_id) {
        handlePayment(response.data.payment_session_id);
      } else {
        alert("Failed to generate payment session.");
      }
    } catch (error) {
      console.error("❌ Payment Initiation Error:", error);
      alert("Payment initiation failed.");
    }
  };

  const handlePayment = async (sessionId) => {
    if (!cashfree) {
      console.error("❌ Cashfree SDK is not loaded yet.");
      return;
    }

    const checkoutOptions = {
      paymentSessionId: sessionId,
      redirectTarget: "_self",
    };

    cashfree.checkout(checkoutOptions).catch((err) =>
      console.error("❌ Payment failed:", err)
    );
  };

  const currentPlan = plans.find((plan) => plan.name === planDetails);
  const currentPlanPrice = currentPlan ? currentPlan.price : 0;
  const reachedLimit = currentPlan ? availableLoom >= currentPlan.looms : false;

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-wrap items-center justify-center gap-10 relative z-50 mt-5">
        {plans.map((plan) => {
          const isActive = paymentStatus === "SUCCESS" && planDetails === plan.name;
          const isLowerPlan = plan.price <= currentPlanPrice;

          return (
            <div
              key={plan.id}
              className="card w-64 px-7 py-5 rounded-2xl transition duration-300 bg-[#d0ddf570]"
            >
              <div className="card-img h-16 w-16 flex items-center justify-center text-blue-500">
                {plan.icon}
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-2xl font-bold">{plan.name}</h1>
                <h2 className="text-2xl font-bold text-blue-500">${plan.price}</h2>
                <p className="text-center text-lg">For Solo Professionals</p>
              </div>
              <div className="border-t p-5 mt-2">
                <ul className="list-disc font-semibold">
                  <li>Limit: {plan.looms} Looms</li>
                  <li>Ideal for freelancers & solo users</li>
                </ul>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 py-1">
                {isActive ? (
                  <span className="text-sm font-medium bg-blue-700 text-white px-10 py-2 rounded">
                    Current Plan
                  </span>
                ) : isLowerPlan ? (
                  <span className="text-center text-sm font-medium bg-gray-400 text-white px-10 py-2 rounded opacity-50">
                    Upgrade Not Available
                  </span>
                ) : (
                  <button
                    className="bg-blue-700 text-sm px-7 py-2 flex items-center justify-center text-white font-semibold rounded cursor-pointer hover:bg-blue-800"
                    onClick={() => handlePaymentInitiate(plan)}
                  >
                    {plan.price === 0.01 ? "Start 3-day FREE trial" : "Upgrade"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PricingSection;
