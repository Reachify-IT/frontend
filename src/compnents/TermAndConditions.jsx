import React from 'react'
import logo from "../assets/Reachify (32).png";
import { Link } from 'react-router-dom';

export default function TermAndConditions() {
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
                        <h1 className="text-3xl font-bold mb-4 text-center">Terms and Conditions for Loomify</h1>

                        <div>
                            <h2 className="text-xl font-semibold mt-4">Introduction</h2>
                            <p className="mt-2">Welcome to the Loomify website. These terms and conditions outline the rules and regulations for the use of Loomify's Website, located at https://reachifyinnovations.com. By accessing this website, we assume you accept these terms and conditions. Do not continue to use the Loomify website if you do not agree to take all of the terms and conditions stated on this page.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mt-4">Intellectual Property Rights</h2>
                            <p className="mt-2">Other than the content you own, under these Terms, Loomify and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.</p>
                        </div>

                        <div>

                            <h2 className="text-xl font-semibold mt-4">Restrictions</h2>
                            <ul className="list-disc pl-6 mt-2">
                                <li>Publishing any Website material in any other media without proper attribution.</li>
                                <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
                                <li>Publicly performing and/or showing any Website material.</li>
                                <li>Using this Website in any way that is or may be damaging to this Website.</li>
                                <li>Using this Website contrary to applicable laws and regulations.</li>
                                <li>Engaging in any data mining, data harvesting, or similar activities.</li>
                            </ul>
                        </div>

                        <div>

                            <h2 className="text-xl font-semibold mt-4">User Content</h2>
                            <p className="mt-2">By displaying Your User Content, you grant Loomify a non-exclusive, worldwide, irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate, and distribute it in any and all media.</p>

                            <h2 className="text-xl font-semibold mt-4">No Warranties</h2>
                            <p className="mt-2">This Website is provided "as is," with all faults, and Loomify expresses no representations or warranties of any kind related to this Website or the materials contained on this Website.</p>
                        </div>

                        <div>

                            <h2 className="text-xl font-semibold mt-4">Limitation of Liability</h2>
                            <p className="mt-2">In no event shall Loomify, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website.</p>
                        </div>

                        <div>

                            <h2 className="text-xl font-semibold mt-4">Indemnification</h2>
                            <p className="mt-2">You hereby indemnify to the fullest extent Loomify from and against any and/or all liabilities, costs, demands, damages, and expenses arising in any way related to your breach of these Terms.</p>
                        </div>
                        <div>

                            <h2 className="text-xl font-semibold mt-4">Severability</h2>
                            <p className="mt-2">If any provision of these Terms is found to be invalid, such provisions shall be deleted without affecting the remaining provisions.</p>
                        </div>
                        <div>

                            <h2 className="text-xl font-semibold mt-4">Variation of Terms</h2>
                            <p className="mt-2">Loomify is permitted to revise these Terms at any time as it sees fit, and you are expected to review these Terms on a regular basis.</p>
                        </div>

                        <div>

                            <h2 className="text-xl font-semibold mt-4">Assignment</h2>
                            <p className="mt-2">Loomify is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification.</p>
                        </div>

                        <div>

                            <h2 className="text-xl font-semibold mt-4">Governing Law & Jurisdiction</h2>
                            <p className="mt-2">These Terms will be governed by and interpreted in accordance with the laws of the State of India, and you submit to the jurisdiction of the courts in India.</p>
                            <p className="mt-4 text-sm"> contact us at <a href="mailto:Support@Loomify.marketing" className="text-blue-600">Support@reachifyinnovations.com</a>.</p>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
