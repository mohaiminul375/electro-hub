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
import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { useTheme } from 'next-themes';
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

const ThemeSwitch = (props: object) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Wait for hydration to avoid mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const isSelected = theme === 'light';

    const { Component, slots, getBaseProps, getInputProps, getWrapperProps } =
        useSwitch({
            ...props,
            isSelected,
            onChange: () => setTheme(isSelected ? 'dark' : 'light'),
        });

    if (!mounted) return null;

    return (
        <div className="flex flex-col gap-2">
            <Component {...getBaseProps()}>
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                    {...getWrapperProps()}
                    className={slots.wrapper({
                        class: [
                            'w-8 h-8',
                            'flex items-center justify-center',
                            'rounded-lg bg-default-100 hover:bg-default-200',
                        ],
                    })}
                >
                    {isSelected ? <SunIcon /> : <MoonIcon />}
                </div>
            </Component>
        </div>
    );
};
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
                        <ThemeSwitch />
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
                  <div className="bg-black text-center">
                        <p className="text-white text-xl">***Website under Maintenance may some features are unavailable.***</p>
                    </div>
            </nav>
        </>
    );

}

export const MoonIcon = (props: object) => {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
                fill="currentColor"
            />
        </svg>
    );
};

export const SunIcon = (props: object) => {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <g fill="currentColor">
                <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
                <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
            </g>
        </svg>
    );
};

