import React from 'react'
import logosmall from "../assets/Untitled design (49).png"

export default function Footer() {
    return (
        <div>
            <footer className='fixed bottom-0 flex items-center justify-center w-full'>
                <p className='flex items-center text-xs'>Powered by
                    <img src={logosmall} alt="" className="h-10 w-10 object-contain" />Reachify
                </p>
            </footer>
        </div>
    )
}
