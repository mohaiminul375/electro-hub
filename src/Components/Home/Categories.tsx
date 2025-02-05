"use client"
import Link from 'next/link'
import React from 'react'
import { BsSmartwatch } from 'react-icons/bs'
import { FaLaptop } from 'react-icons/fa'
import { FaComputerMouse } from 'react-icons/fa6'
import { GiSmartphone } from 'react-icons/gi'
import { LuMonitor } from 'react-icons/lu'
import { MdConnectedTv } from 'react-icons/md'

export default function Categories() {
    return (
        <section className='mt-10'>
            <div>
                <h2 className='text-3xl font-semibold'>Categories</h2>
            </div>
            {/* categories */}

            <div className='md:grid lg:grid-cols-5 xl:grid-cols-6 md:grid-cols-3 mt-5 gap-14 xl:gap-16 md:flex-none flex flex-col justify-center items-center'>
                {/* smart phone */}
                <Link href='/products/smart_phone'>
                    <div className='border hover:border-none w-52 md:w-40 flex flex-col items-center justify-center p-5 md:p-3 bg-primary space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <GiSmartphone className='text-5xl font-bold group-hover:text-secondary' />
                        <div>
                            <h2 className='text-lg group-hover:text-secondary duration-300'>Smart Phone</h2>
                        </div>
                    </div>
                </Link>
                {/* smart Watch */}
                <Link href='/products/smart_watch'>
                    <div className='border hover:border-none w-52 md:w-40 flex flex-col items-center justify-center p-5 md:p-3 bg-primary space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <BsSmartwatch className='text-5xl font-bold group-hover:text-secondary' />
                        <div>
                            <h2 className='text-lg group-hover:text-secondary duration-300'>Smart Watch</h2>
                        </div>
                    </div>
                </Link>
                {/* laptop */}
                <Link href='/products/laptop'>
                    <div className='border hover:border-none w-52 md:w-40 flex flex-col items-center justify-center p-5 md:p-3 bg-primary space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <FaLaptop className='text-5xl font-bold group-hover:text-secondary' />
                        <div>
                            <h2 className='text-lg group-hover:text-secondary duration-300'>Laptop</h2>
                        </div>
                    </div>
                </Link>
                {/* monitor */}
                <Link
                    href='/products/monitor'>
                    <div className='border hover:border-none w-52 md:w-40 flex flex-col items-center justify-center p-5 md:p-3 bg-primary space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <LuMonitor className='text-5xl font-bold group-hover:text-secondary' />
                        <div>
                            <h2 className='text-lg group-hover:text-secondary duration-300'>Monitor</h2>
                        </div>
                    </div>
                </Link>
                {/* accessories */}
                <Link
                    href='/products/accessories'>
                    <div className='border hover:border-none w-52 md:w-40 flex flex-col items-center justify-center p-5 md:p-3 bg-primary space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <FaComputerMouse className='text-5xl font-bold group-hover:text-secondary' />
                        <div>
                            <h2 className='text-lg group-hover:text-secondary duration-300'>Accessories</h2>
                        </div>
                    </div>
                </Link>

                {/* smart tv */}
                <Link
                    href='/products/smart_tv'>
                    <div className='border hover:border-none w-52 md:w-40 flex flex-col items-center justify-center p-5 md:p-3 bg-primary space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <MdConnectedTv
                            className='text-5xl font-bold group-hover:text-secondary' />
                        <div>
                            <h2 className='text-lg group-hover:text-secondary duration-300'>Smart Tv</h2>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}
