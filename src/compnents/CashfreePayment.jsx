import  { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";

export default function CashfreePayment() {
  const [Cashfree, setCashfree] = useState(null);
  const [sessionId, setSessionId] = useState("");

  // ✅ Initialize Cashfree on Component Mount
  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cashfreeInstance = await load({ mode: "production" });
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error("❌ Error initializing Cashfree:", error);
      }
    };
    initializeCashfree();
  }, []);

  // ✅ Handle Payment
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!Cashfree) {
      console.error("❌ Cashfree SDK is not loaded yet.");
      return;
    }

    if (!sessionId) {
      console.error("❌ No Payment Session ID available.");
      return;
    }

    const checkOutOptions = {
      paymentSessionId: sessionId, // 🔹 Set sessionId dynamically
      redirectTarget: "_self",
    };

    Cashfree.checkout(checkOutOptions)
      .then(() => console.log("✅ Payment initialized"))
      .catch((err) => console.error("❌ Payment failed:", err));
  };


}
