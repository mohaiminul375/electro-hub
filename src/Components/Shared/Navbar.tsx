"use client"
import { NavbarBrand, NavbarContent, Navbar, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Avatar } from "@nextui-org/react";
import Image from "next/image";
import {
    //  Kalam, Protest_Revolution,
    Sevillana
} from "next/font/google";
import React, { useEffect, useState } from "react";
// import { RxAvatar } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { FaCartPlus, FaHome, FaSearch, FaUserCircle } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
import NavSearch from "./NavSearch";
// import path from "path";

interface NavItems {
    title: string,
    path: string,
    adminOnly?: boolean
}


// font
const sevillana = Sevillana({
    weight: '400',
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
    }

]


export default function Nav() {
    // Get user session
    const session = useSession();
    // console.log(session)
    const isAdmin = session?.data?.user?.role === 'admin';
    const user_email = session?.data?.user?.email;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);

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
    // console.log(isSearchBoxVisible)
    return (
        <>

            <nav className="">
                <Navbar
                    isMenuOpen={isMenuOpen}
                    onMenuOpenChange={setIsMenuOpen}
                    isBordered
                    maxWidth="full"
                    className="lg:px-10 bg-accent text-white md:h-20 fixed top-0 w-full z-10"
                >

                    <NavbarContent className="" justify="start">
                        <NavbarMenuToggle
                            className="lg:hidden"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                        <NavbarBrand>
                            <Link
                                href='/'
                                className="flex gap-2 justify-start items-center mr-5 md:mr-0 cursor-pointer">
                                <Image
                                    src="/assets/logo.webp"
                                    alt="logo"
                                    height={30}
                                    width={30}
                                    className="w-5 md:w-8 rounded-full"
                                />
                                <h2
                                    className={`text-lg font-bold lg:text-3xl text-primary ${sevillana.className}`}
                                >
                                    Electro-Hub
                                </h2>
                            </Link>
                        </NavbarBrand>
                    </NavbarContent>


                    {/* search bar */}
                    <NavbarContent className="hidden md:flex gap-4" justify="center">
                        <NavSearch />
                    </NavbarContent>

                    <NavbarContent as="div" justify="end" className="pr-5">

                        {/* hidden for sm device */}
                        <div className="hidden md:flex gap-5">
                            {
                                isAdmin && <Link href="/admin-dashboard">
                                    <MdAdminPanelSettings className="text-2xl md:text-3xl" />
                                </Link>
                            }
                            <Link href='/support'> <BiSupport className="text-2xl md:text-3xl" /></Link>
                            <Link color="foreground" href="/cart">
                                <FaCartPlus className="text-2xl md:text-3xl" />
                            </Link>
                            {
                                session?.data ?
                                    <Dropdown placement="bottom-end">
                                        <DropdownTrigger>
                                            <Avatar
                                                isBordered
                                                as="button"
                                                className="transition-transform"
                                                color="primary"
                                                name="Jason Hughes"
                                                size="sm"
                                                src="https://i.ibb.co.com/RbY8vby/avatar.png"
                                            />
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                                            <DropdownItem key="profile" className="h-14 gap-2">
                                                <p className="font-semibold">Signed in as</p>
                                                <p className="font-semibold">{user_email}</p>
                                            </DropdownItem>
                                            <DropdownItem key="my-account">
                                                <Link className='border border-primary rounded-md block' href='/user/profile'>
                                                    My Account
                                                </Link>
                                            </DropdownItem>
                                            <DropdownItem key="my-orders"><Link className='border border-primary rounded-md block' href='/my-orders'>
                                                My Orders
                                            </Link>
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => signOut()}
                                                key="logout" color="danger">
                                                Log Out
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    : <Link href="/login" className="flex-col justify-center text-white">
                                        <FaUserCircle className="text-2xl md:text-3xl" />

                                    </Link>
                            }

                        </div>
                        {/* functionality for small device */}
                        <div className="flex items-center justify-center h-10 lg:hidden">
                            <FaSearch
                                onClick={() => setIsSearchBoxVisible(!isSearchBoxVisible)}
                            />
                            {/* <div className="flex items-center bg-white text-gray-400 rounded-lg overflow-hidden shadow-md w-52 mr-5  lg:w-96 xl:w-[500px] h-10">
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
                        </div> */}
                        </div>
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
                        } hidden lg:flex justify-evenly items-center gap-8 h-10 lg:text-medium font-semibold border-red-900 bg-accent text-white w-full shadow-lg mt-20`}
                >
                    {/* mt-20 */}
                    <Link className="text-white" href="/"><FaHome /></Link>
                    <Link className="text-white" href="/all-products">All-products</Link>
                    <Link className="text-white" href="/products/smart_phone">Smart-Phone</Link>
                    <Link className="text-white" href="/products/smart_watch">Smart-Watch</Link>
                    <Link className="text-white" href="/products/laptop">Laptop</Link>
                    <Link className="text-white" href="/products/monitor">Monitor</Link>
                    <Link className="text-white" href="/products/accessories">Accessories</Link>
                    <Link className="text-white" href="/products/smart_tv">Smart-Tv</Link>
                </div>
                {
                    isSearchBoxVisible &&
                    <div
                        className={`
       md:hidden flex justify-center mb-10 h-14 lg:text-lg font-semibold border-red-900 bg-[#0E0E0E] mt-16 text-white w-full shadow-lg`}
                    >
                        <NavSearch />
                    </div>
                }
            </nav>
        </>
    );

}

