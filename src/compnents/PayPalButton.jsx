import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
    

const PayPalButton = ({ amount, planDetails }) => {
    const [clientId, setClientId] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        async function fetchClientId() {
            setIsLoading(true);
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BackendURL}/api/payments1/config`,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem("accessToken")}`,
                        },
                    }
                );
                setClientId(res.data.clientId);
            } catch (err) {
                console.error("❌ Error fetching PayPal Client ID:", err);
                toast.error("Failed to fetch PayPal Client ID.");
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchClientId();
    }, []);

    return (
        <>
            {clientId && (
                <PayPalScriptProvider options={{ "client-id": clientId }}>
                    <PayPalButtons
                        style={{
                            layout: "vertical",
                            color: "blue",
                            shape: "rect",
                            label: "paypal",
                        }}
                        fundingSource="paypal" 
                        createOrder={async () => {
                            try {
                                const res = await axios.post(
                                    `${import.meta.env.VITE_BackendURL}/api/payments1/initiate`,
                                    { planDetails }, // ✅ Send planDetails, backend determines amount
                                    {
                                        headers: {
                                            Authorization: `${localStorage.getItem("accessToken")}`,
                                        },
                                    }
                                );

                                const approvalUrl = new URL(res.data.approvalUrl);
                                const paypalOrderId = approvalUrl.searchParams.get("token");

                                // ✅ Store orderId for later use
                                localStorage.setItem("orderId", res.data.orderId);

                                return paypalOrderId; // ✅ PayPal expects only order ID here
                            } catch (error) {
                                console.error("❌ Payment initiation error:", error);
                                toast.error("Failed to initiate payment. Please try again.");
                                throw error;
                            }
                        }}
                        onApprove={async (data) => {
                            try {
                                const orderId = localStorage.getItem("orderId"); // Retrieve stored orderId

                                const captureRes = await axios.post(
                                    `${import.meta.env.VITE_BackendURL}/api/payments1/capture`,
                                    {
                                        paypalOrderId: data.orderID,
                                        orderId, // ✅ Send stored orderId
                                    }
                                );

                                console.log("✅ Payment successful:", captureRes.data);
                                toast.info("Payment successful! Redirecting...", {
                                    position: "bottom-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    icon: <FaCheckCircle className="text-blue-500 h-16 w-16" />,
                                    theme: "light",
                                });
                                navigate("/home");
                            } catch (error) {
                                console.error("❌ Capture payment error:", error);
                                toast.error("Failed to capture payment. Please try again.", {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    theme: "colored",
                                });
                            }
                        }}
                        onError={(err) => {
                            console.error("❌ Payment error:", err);
                            toast.error("Payment failed. Please try again.", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                theme: "colored",
                            });
                        }}
                    />
                </PayPalScriptProvider>
            )}
        </>
    );
};

export default PayPalButton;
