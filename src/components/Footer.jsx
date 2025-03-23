import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className='py-5 sm:px-10 px-5'>
        <div className='screen-max-width'>
            <div>
                <p className='font-semibold text-gray text-xs'>
                    More ways to shop:  {''}  
                    <span className='underline text-blue'>
                      Find an apple store {' '}
                    </span>
                    or{' '}
                    <span className='underline text-blue'>
                      other retailer
                    </span>
                    {' '} near you. 
                </p>
                <p className='font-semibold text-gray text-xs'>
                    Or call {' '}
                    <span className='text-blue underline'>
                        000800 040 1966.
                    </span>
                </p>
            </div>
            <div className='bg-neutral my-5 h-[1px] w-full'/>
            <div className="flex md:flex-row flex-col md:items-center justify-between">
            <p className="font-semibold text-gray text-xs">Copright @ 2024 Apple Inc. All rights reserved.</p>
            <div className='flex gap-2 mt-1 sm:mt-0'>
                {footerLinks.map((link, i) => (
                <p key={link} className="font-semibold text-gray text-xs">
                    {link}{' '}
                    { i !== footerLinks.length - 1 && <span>|</span>}
                </p>
                ))}
            </div>
            <p>India</p>
            </div>  
        </div>
    </footer>
  )
}

export default Footer
