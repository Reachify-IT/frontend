import React from 'react';
import logo from "../assets/Reachify (32).png";
import { Link } from 'react-router-dom';

export default function RefundPolicy() {
    return (
        <>
            <div className="fixed top-0 z-50 flex items-center px-10 py-4 w-full">
                <div className="flex justify-between w-full items-center">
                    <Link to="/" >
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
                            <p className="font-semibold text-lg">Loomify</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl p-4">
                <div className="center-blob-1"></div>
                <div className="center-blob-2"></div>
                <div className="bg-white max-w-3xl p-8 rounded-lg h-[80vh] overflow-y-auto w-full">
                    <div className='flex flex-col gap-8'>
                        <div>
                            <h1 className="text-2xl font-bold mb-4 text-center">No Refund Policy</h1>
                            <p className="mb-4">Thank you for choosing Loomify. We are committed to providing high-quality AI-powered video merging and email personalization software to enhance your marketing and communication strategies.</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mt-4">1. No Refunds, All Sales Are Final</h2>
                            <p className="mb-4">By purchasing or subscribing to Loomify, you acknowledge and agree that all sales are final and non-refundable. We do not offer refunds, returns, or exchanges for any reason, including but not limited to:</p>
                            <ul className="list-disc pl-5 mb-4">
                                <li>Change of mind after purchase.</li>
                                <li>Failure to use the software due to lack of time, technical knowledge, or compatibility issues.</li>
                                <li>Subscription auto-renewals that were not canceled before the billing date.</li>
                                <li>Dissatisfaction with software features if they function as described.</li>
                                <li>Accidental purchases or duplicate transactions.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mt-4">2. Free Trial & Demo Availability</h2>
                            <p className="mb-4">To ensure customer satisfaction, we may offer a free trial or demo version of our software. We strongly encourage users to explore the features before making a purchase.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mt-4">3. Subscription Management</h2>
                            <p className="mb-4">Users are responsible for managing their subscriptions.</p>
                            <ul className="list-disc pl-5 mb-4">
                                <li>You can cancel your subscription anytime before the next billing cycle to avoid further charges.</li>
                                <li>Once a payment is processed, it is non-refundable.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mt-4">4. Exceptional Cases</h2>
                            <p className="mb-4">In rare circumstances, such as a billing error or technical issue preventing access to the software, you may contact our support team at <a href="mailto:support@reachifyinnovations.com" className="text-blue-600">support@reachifyinnovations.com</a> for assistance. Refunds will only be considered at our sole discretion.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mt-4">5. Policy Updates</h2>
                            <p className="mb-4">We reserve the right to modify or update this policy at any time. Any changes will be effective immediately upon posting on our website.</p>

                            <p className="mt-6 text-center">For any inquiries or concerns, please reach out to <a href="mailto:support@reachifyinnovations.com" className="text-blue-600">support@reachifyinnovations.com</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
