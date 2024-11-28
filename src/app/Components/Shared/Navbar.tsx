"use client"
import { NavbarBrand, NavbarContent, NavbarItem, Link, Navbar, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Dropdown, DropdownTrigger, Avatar, DropdownItem, DropdownMenu } from "@nextui-org/react";
import Image from "next/image";
import { Kalam } from "next/font/google";
import React from "react";
import { RxAvatar } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
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
export default function Nav() {
    // get user
    const session = useSession();

    const isAdmin = session?.data?.user?.role === 'admin'
    console.log(session)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <Navbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            isBordered maxWidth="full"
            className="md:px-20 bg-primary text-white">
            <NavbarContent className="md:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>
            {/* <NavbarContent justify="start"> */}
            <NavbarBrand>
                <div className="flex items-center gap-3 sm:gap-0 justify-start flex-wrap">
                    <Image
                        src="/assets/logo.webp"
                        alt="logo"
                        height={40}
                        width={40}
                        className="h-10 w-10 sm:h-10 sm:w-8"
                    />
                    <h2
                        className={`hidden md:flex text-base sm:text-lg md:text-3xl text-accent ${kalam.className}`}
                    >
                        Electro-Hub
                    </h2>
                </div>
            </NavbarBrand>
            {/* </NavbarContent> */}
            <NavbarContent className="hidden md:flex gap-4" justify="center">

                {
                    navItems
                        ?.filter(({ adminOnly }) => !adminOnly || isAdmin) // Only include admin routes if isAdmin is true
                        .map(({ title, path }, idx) => (
                            <NavbarItem key={idx}>
                                <Link color="secondary" href={path}>
                                    {title}
                                </Link>
                            </NavbarItem>
                        ))
                }

            </NavbarContent>
            <NavbarContent as="div" justify="end">
                {
                    session?.data ? <>

                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <button className="p-2 rounded-full bg-accent">My Account</button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">zoey@example.com</p>
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => signOut()}
                                    key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </> : <NavbarItem className="flex items-center">
                        <RxAvatar className="text-accent text-2xl mr-1"></RxAvatar>
                        <div>
                            <Link className="text-white hover:text-accent" href="/login">Login</Link>
                            <span className="mx-1">or</span>
                            <Link className="text-white" href="/register">Register</Link>
                        </div>
                    </NavbarItem>
                }
            </NavbarContent>
            {/* menu for sm device */}
            <NavbarMenu>
                {navItems.map(({ title, path }, idx) => (
                    <NavbarMenuItem
                        key={idx}>
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
    )
}
