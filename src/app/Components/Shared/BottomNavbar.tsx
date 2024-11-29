import Link from 'next/link';
import React from 'react';
import { BiSupport } from 'react-icons/bi';
import { FaCartPlus, FaUserCircle } from 'react-icons/fa';

const BottomNavbar = () => {
    return (
        <nav className="md:hidden bg-accent fixed bottom-0 z-50 h-10 w-full">
            <div className="flex justify-between items-center text-white gap-5 px-10 h-full">
                <BiSupport className="text-2xl md:text-3xl" />
                <FaCartPlus className="text-2xl md:text-3xl" />
                <Link href="/login" className="text-white">
                    <FaUserCircle className="text-2xl md:text-3xl" />
                </Link>
            </div>
        </nav>
    );
};

export default BottomNavbar;