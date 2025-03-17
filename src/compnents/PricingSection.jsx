import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { useSelector } from "react-redux";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 1000,
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
  const [Cashfree, setCashfree] = useState(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cashfreeInstance = await load({ mode: "sandbox" });
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
            Authorization: ` ${localStorage.getItem("accessToken")}`,
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
    if (!Cashfree) {
      console.error("❌ Cashfree SDK is not loaded yet.");
      return;
    }

    const checkOutOptions = {
      paymentSessionId: sessionId,
      redirectTarget: "_self",
    };

    Cashfree.checkout(checkOutOptions).catch((err) =>
      console.error("❌ Payment failed:", err)
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-10 relative z-50 mt-5">
        {plans.map((plan) => {
          const isActive = user?.planDetails === plan.name ;
          return (
            <div
              key={plan.id}
              className={"card w-64 px-7 py-5 rounded-2xl transition duration-300 bg-[#d0ddf570] "}
            >
              <div className="card-img h-16 w-16 flex items-center justify-center text-blue-500">{plan.icon}</div>
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
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-700 text-sm px-7 py-3 flex items-center justify-center text-white font-semibold rounded-2xl cursor-pointer hover:bg-blue-800"
                  onClick={() => handlePaymentInitiate(plan)}
                >
                  {isActive ? "Current Plan" : "Start 3-day FREE trial"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingSection;
