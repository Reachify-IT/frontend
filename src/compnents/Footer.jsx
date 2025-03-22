import React from 'react'
import logosmall from "../assets/Untitled design (49).png"

export default function Footer() {
    return (
        <div>
            <footer className='fixed bottom-0 mb-3 flex items-center justify-center w-full'>
                <p className='flex items-center text-xs mt-2'>@Powered by
                    <img src={logosmall} alt="" className="h-8 w-8 object-contain " /><span className='mt-1 comLogo text-[16px]'>Reachify</span>
                </p>
            </footer>
        </div>
    )
}
