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

            <div className='grid lg:grid-cols-5 xl:grid-cols-6 md:grid-cols-3 mt-5 gap-14 xl:gap-16'>
                {/* smart phone */}
                <Link href='/category/smart-phone'>
                    <div className='border hover:border-none w-40 flex flex-col items-center justify-center p-3 bg-primary space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <GiSmartphone className='text-5xl font-bold group-hover:text-secondary' />
                        <div>
                            <h2 className='text-xl group-hover:text-secondary duration-300'>Smart Phone</h2>
                        </div>
                    </div>
                </Link>
                {/* smart Watch */}
                <Link href='/category/smart-watch'>
                    <div className='border hover:border-none w-40 flex flex-col items-center p-3 bg-accent space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
                        <BsSmartwatch className='text-5xl text-primary group-hover:text-secondary' />
                        <div>
                            <h2 className='text-xl group-hover:text-secondary duration-300 text-primary'>Smart Watch</h2>
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
                <Link
                    style={{ background: "linear-gradient(135deg, #72BF44, #0E0E0E)" }}
                    href='/category/monitor'>
                    <div className='border hover:border-none w-40 flex flex-col items-center p-3 space-y-2 hover:shadow border-primary rounded-md shadow-2xl lg:transition lg:hover:scale-105 group'>
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
                <Link href="/category/smart-watch">
                    <div className="border hover:border-none w-40 flex flex-col items-center p-3 space-y-2 bg-gradient-to-br from-primary to-accent hover:shadow-[0_0_15px_3px_#72BF44] border-primary rounded-md shadow-lg transition-transform duration-300 transform hover:scale-105 group">
                        <BsSmartwatch className="text-5xl text-white group-hover:text-secondary drop-shadow-lg" />
                        <div>
                            <h2 className="text-xl text-white group-hover:text-secondary duration-300">
                                Smart Watch
                            </h2>
                        </div>
                    </div>
                </Link>

            </div>
        </section>
    )
}
