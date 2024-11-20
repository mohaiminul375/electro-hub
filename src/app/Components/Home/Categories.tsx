"use client"
import Link from 'next/link'
import React from 'react'
import { BsSmartwatch } from 'react-icons/bs'
import { FaLaptop } from 'react-icons/fa'
import { FaComputerMouse } from 'react-icons/fa6'
import { GiSmartphone } from 'react-icons/gi'
import { LuMonitor } from 'react-icons/lu'
import { MdTv } from 'react-icons/md'

export default function Categories() {
    return (
        <section className='mt-10'>
            <div>
                <h2 className='text-3xl font-semibold'>Categories</h2>
            </div>
            {/* categories */}

            <div className='grid lg:grid-cols-6 mt-5 gap-16'>
                {/* smart phone */}
                <Link href='/category/smart-phone'>
                    <div className='border hover:border-none w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <GiSmartphone className='text-5xl font-bold' />
                        <div>
                            <h2 className='text-xl group-hover:text-accent duration-300'>Smart Phone</h2>
                        </div>
                    </div>  
                </Link>
                {/* smart Watch */}
                <Link href='/category/smart-watch'>
                    <div className='border hover:border-none w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <BsSmartwatch className='text-5xl' />
                        <div>
                            <h2 className='text-xl group-hover:text-accent duration-300'>Smart Watch</h2>
                        </div>
                    </div>
                </Link>
                {/* laptop */}
                <Link href='/category/laptop'>
                    <div className='border hover:border-none w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <FaLaptop className='text-5xl font-bold' />
                        <div>
                            <h2 className='text-xl group-hover:text-accent duration-300'>Laptop</h2>
                        </div>
                    </div>
                </Link>
                {/* monitor */}
                <Link href='/category/monitor'>
                    <div className='border hover:border-none w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                    <LuMonitor className='text-5xl font-bold' />
                        <div>
                            <h2 className='text-xl group-hover:text-accent duration-300'>Monitor</h2>
                        </div>
                    </div>
                </Link>
                {/* accessories */}
                <Link href='/category/accessories'>
                    <div className='border hover:border-none w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <FaComputerMouse className='text-5xl font-bold' />
                        <div>
                            <h2 className='text-xl group-hover:text-accent duration-300'>Accessories</h2>
                        </div>
                    </div>
                </Link>
                {/* smart tv */}
                <Link href='/category/smart-tv'>
                    <div className='border hover:border-none w-40 flex flex-col items-center p-3 bg-white space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <MdTv className='text-5xl font-bold' />
                        <div>
                            <h2 className='text-xl group-hover:text-accent duration-300'>Smart TV</h2>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}
