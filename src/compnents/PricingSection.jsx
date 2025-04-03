import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import axios from "axios";
import Loader from "./Loader";
import PayPalButton from "./PayPalButton";

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
  const [isloading, setIsloading] = useState(false);
  const [PaymentStatus, setPaymentStatus] = useState("");
  const [planDetails, setPlanDetails] = useState("Trial");
  const [avialoom, setAvialoom] = useState(0);

  const fetchUserInfo = async () => {
    setIsloading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/auth/me`, {
        headers: { Authorization: `${token}` },
      });

      console.log("📌 UserInfo:", response.data.user);

      const paymentHistory = response.data.user.paymentHistory;

      if (paymentHistory && paymentHistory.length > 0) {
        const latestPayment = paymentHistory.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        setPaymentStatus(latestPayment.status);
        setPlanDetails(response.data.user.planDetails);
        setAvialoom(response.data.user.videosCount);
      } else {
        setPaymentStatus(null);
        setPlanDetails("Trial");
      }
    } catch (error) {
      console.error("🚨 Error fetching user info:", error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const currentPlan = plans.find((plan) => plan.name === planDetails);
  const currentPlanPrice = currentPlan ? currentPlan.price : 0;
  const reachedLimit = avialoom === currentPlan?.looms;

  return (
    <>
      {isloading && <Loader />}
      <div>
        <div className="flex flex-wrap items-center justify-center gap-10 relative z-50 mt-5">
          {plans.map((plan) => {
            const isActive = PaymentStatus === "SUCCESS" && planDetails === plan.name;
            const isLowerPlan = plan.price <= currentPlanPrice;

            return (
              <div
                key={plan.id}
                className="card w-64 px-7 py-5 rounded-2xl transition duration-300 bg-[#d0ddf570] "
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
                  {reachedLimit ? (
                    <PayPalButton amount={plan.price} planDetails={plan.name} />
                  ) : isActive ? (
                    <span className="text-sm font-medium bg-blue-700 text-white px-10 py-2 rounded">
                      Current Plan
                    </span>
                  ) : isLowerPlan ? (
                    <span className="text-center text-sm font-medium bg-gray-400 text-white px-10 py-2 rounded opacity-50">
                      Upgrade Not Available
                    </span>
                  ) : (
                    <PayPalButton amount={plan.price.toFixed(2)} planDetails={plan.name} />
                  )}
                </div>


              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PricingSection;
