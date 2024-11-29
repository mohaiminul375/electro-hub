"use client"
import { NavbarBrand, NavbarContent, NavbarItem, Link, Navbar, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";
import Image from "next/image";
import { Kalam } from "next/font/google";
import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { FaCartPlus, FaHome, FaSearch, FaUserCircle } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
// import path from "path";

interface NavItems {
    title: string,
    path: string,
    adminOnly?: boolean
}


// font
const kalam = Kalam({
    weight: '700',
    subsets: ['latin'],
});
const navItems: NavItems[] = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Products",
        path: "/all-products",
    }, {
        title: 'Admin-dashboard',
        path: '/admin-dashboard',
        adminOnly: true,
    }

]


export default function Nav2() {
    // Get user session
    const session = useSession();
    const isAdmin = session?.data?.user?.role === 'admin';

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    // Handle scrolling to hide category menu
    useEffect(() => {
        let lastScrollY = window.scrollY; // Store last scroll position
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) { // If scrolling down
                setScrolling(true); // Hide the category menu
            } else { // If scrolling up
                setScrolling(false); // Show the category menu
            }
            lastScrollY = window.scrollY; // Update the last scroll position
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav>
            <Navbar
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                isBordered
                maxWidth="full"
                className="lg:px-10 bg-[#0E0E0E] text-white md:h-20 fixed top-0 w-full z-10"
            >
                <NavbarContent className="" justify="start">
                    <NavbarMenuToggle
                    className="lg:hidden"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                    <NavbarBrand>
                        <div className="flex gap-2 justify-start items-center mr-5 md:mr-0">
                            <Image
                                src="/assets/logo.webp"
                                alt="logo"
                                height={30}
                                width={30}
                                className="w-3 lg:w-8 rounded-full"
                            />
                            <h2
                                className={`text-2xl lg:text-2xl text-[#72BF44] ${kalam.className}`}
                            >
                                Electro-Hub
                            </h2>
                        </div>
                    </NavbarBrand>
                </NavbarContent>


                {/* search bar */}
                <NavbarContent className="hidden md:flex gap-4 md:mr-14" justify="center">
                    <div className="flex items-center justify-center h-10">
                        <div className="flex items-center bg-white text-gray-400 rounded-lg overflow-hidden shadow-md w-80 lg:w-96 xl:w-[500px] h-10">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-3 text-base bg-white text-gray-700 focus:outline-none focus:ring focus:ring-[#72BF44] w-full"
                            />
                            <button
                                className="px-4 py-5 bg-[#72BF44] text-white hover:bg-[#71bf4479] focus:outline-none focus:ring focus:ring-[#72BF44] flex items-center justify-center"
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                </NavbarContent>

                <NavbarContent as="div" justify="end" className="pr-5">
                    <div className="hidden md:flex gap-5">
                        <BiSupport className="text-2xl md:text-3xl" />
                        <FaCartPlus className="text-2xl md:text-3xl" />
                        <FaUserCircle className="text-2xl md:text-3xl" />
                    </div>
                    {/* <div className="flex items-center justify-center h-10 lg:hidden">
                        <div className="flex items-center bg-white text-gray-400 rounded-lg overflow-hidden shadow-md w-52 mr-5  lg:w-96 xl:w-[500px] h-10">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-3 text-base bg-white text-gray-700 focus:outline-none focus:ring focus:ring-[#72BF44] w-full"
                            />
                            <button
                                className="px-4 py-5 bg-[#72BF44] text-white hover:bg-[#71bf4479] focus:outline-none focus:ring focus:ring-[#72BF44] flex items-center justify-center"
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </div> */}
                </NavbarContent>

                {/* Menu for small devices */}
                <NavbarMenu>
                    {navItems.map(({ title, path }, idx) => (
                        <NavbarMenuItem key={idx}>
                            <Link
                                className="w-full"
                                color={
                                    idx === 2 ? "warning" : idx === navItems.length - 1 ? "danger" : "foreground"
                                }
                                href={path}
                                size="lg"
                            >
                                {title}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>

            {/* Category section */}
            <div
                className={`${scrolling ? 'hidden' : 'flex'
                    } hidden lg:flex justify-evenly items-center gap-8 mb-10 h-10 lg:text-lg font-semibold border-red-900 bg-[#0E0E0E] mt-20 text-white w-full shadow-lg`}
            >
                <Link className="text-white" href="/"><FaHome /></Link>
                <Link className="text-white" href="/all-products">All-products</Link>
                <Link className="text-white" href="/smart-phone">Smart-Phone</Link>
                <Link className="text-white" href="/smart-phone">Smart-Phone</Link>
                <Link className="text-white" href="/smart-watch">Smart-Watch</Link>
                <Link className="text-white" href="/laptop">Laptop</Link>
                <Link className="text-white" href="/monitor">Monitor</Link>
                <Link className="text-white" href="/accessories">Accessories</Link>
                <Link className="text-white" href="/smart-tv">Smart-Tv</Link>
            </div>
        </nav>
    );
}

