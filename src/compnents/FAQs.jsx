import React from 'react'
import CustomAccordion from './CustomAccordion'

function FAQs() {
    return (
        <div className='bg-gradient-to-r from-[#070707] to-[#131313]'>
        <div className="h-full  flex items-start justify-center flex-col py-20 contairner-fluid">
        <div className='px-10 py-10 w-full mx-auto'>
            <div>
                <h1 className='max-w-[20ch] text-4xl font-bold leading-[150%]'>FAQs</h1>
                <p className='max-w-[90ch] text-sm pt-4 leading-[120%]'>Find answers to common questions about AI in marketing and our services.</p>
            </div>
            
            <div className='flex items-center justify-center w-full m-auto'>
                <CustomAccordion />
            </div>
        </div>
        </div>
        </div>
    )
}

export default FAQs





