import React from 'react'
import logo from "../assets/Reachify (32).png";
import { Link } from 'react-router-dom';


export default function PrivacyPolicy() {
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
            <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
                <div className="center-blob-1"></div>
                <div className="center-blob-2"></div>
                <div className="bg-white max-w-3xl p-8 rounded-lg h-[80vh] overflow-y-auto w-full">
                    <div className='flex flex-col gap-8'>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Privacy Policy at Loomify</h1>
                        <div>
                            <h2 className="text-2xl font-semibold mt-8 text-gray-700">Introduction</h2>
                            <p className="text-gray-600 mt-2">
                                At Loomify, we prioritize your privacy and the security of your personal information. This privacy policy outlines our
                                practices regarding the collection, use, protection, and sharing of information obtained from users of our website.
                                By accessing and using our website, you agree to the terms and conditions set forth in this privacy policy.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mt-4 text-gray-700">Information We Collect</h2>

                            <h3 className="text-xl font-medium mt-3 text-gray-700">Personal Information</h3>
                            <p className="text-gray-600 mt-2">
                                When you engage with our website, we may collect personal information that you voluntarily provide. This could include, but is not limited to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mt-2">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Telephone number</li>
                                <li>Any other relevant forms or customer service instruction</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium mt-3 text-gray-700">Non-Personal Information</h3>
                            <p className="text-gray-600 mt-2">
                                Our website automatically collects certain non-personal information regarding your visit. This information helps us to improve your user experience and may include:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mt-2">
                                <li>IP address</li>
                                <li>Browser type and version</li>
                                <li>Operating System</li>
                                <li>Pages you visit on our site</li>
                                <li>Access times and date</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mt-4 text-gray-700">Use of Your Information</h2>
                            <p className="text-gray-600 mt-2">
                                The information we collect is used in a variety of ways, including:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mt-2">
                                <li>To improve our website and the services we offer</li>
                                <li>To respond to your queries and fulfill your requests</li>
                                <li>To send updates and marketing communication about our products and services</li>
                                <li>To analyze website usage for improvement purposes</li>
                                <li>To comply with legal requirements and protect our website policies</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mt-4 text-gray-700">Sharing of Information</h2>
                            <p className="text-gray-600 mt-2">
                                Loomify is committed to not selling, trading, or renting your personal information to third parties. However, your information may be shared under the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mt-2">
                                <li>With service providers who perform functions on our behalf, under strict confidentiality agreements</li>
                                <li>With legal authorities, when required by law or to protect our rights and the safety of others</li>
                                <li>With business partners for the purposes of joint marketing efforts or business transitions</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mt-4 text-gray-700">Data Security</h2>
                            <p className="text-gray-600 mt-2">
                                We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized
                                access, alteration, disclosure, or destruction of your personal information. While we strive to use commercially acceptable
                                means to protect your personal information, no method of transmission over the Internet, or method of electronic storage, is 100% secure.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mt-4 text-gray-700">Third-Party Links</h2>
                            <p className="text-gray-600 mt-2">
                                Our website may include links to external sites that are operated by third parties. Please be aware that we do not control these
                                external websites and are not responsible for their privacy practices. We encourage you to read the privacy statements of any other
                                site that collects personally identifiable information.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mt-4 text-gray-700">Changes to This Privacy Policy</h2>
                            <p className="text-gray-600 mt-2">
                                Loomify reserves the right to update or change our privacy policy at any time. Any changes will be posted on this page with an
                                updated revision date. We encourage you to review our privacy policy periodically to stay informed about how we are protecting the
                                information we collect.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mt-4 text-gray-700">Contacting Us</h2>
                            <p className="text-gray-600 mt-2">
                                If you have any questions or comments about this privacy policy, please contact us at:
                            </p>
                            <p className="text-gray-600 font-medium">Loomify Customer Service</p>
                            <p className="text-gray-600 font-medium">Support@Loomifyinnovations.com</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
