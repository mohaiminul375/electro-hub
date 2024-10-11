"use client"
import { NavbarBrand, NavbarContent, NavbarItem, Link, Navbar, NavbarMenuToggle, NavbarMenuItem, NavbarMenu } from "@nextui-org/react";
import Image from "next/image";
import { Kalam } from "next/font/google";
import React from "react";
import { RxAvatar } from "react-icons/rx";
// import path from "path";

interface NavItems {
    title: string,
    path: string,
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
    },

]
export default function Nav() {
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
                <div className="flex items-center gap-3 justify-start">
                    <Image src='/assets/logo.webp' alt="logo" height={40} width={40} />
                    <h2 className={`md:text-3xl text-[#36454F] ${kalam.className}`}>Electro-Hub</h2>
                </div>
            </NavbarBrand>
            {/* </NavbarContent> */}
            <NavbarContent className="hidden md:flex gap-4" justify="center">

                {
                    navItems?.map(({ title, path }, idx) => (
                        <NavbarItem key={idx}>
                            <Link color="secondary" href={path}>
                                {title}
                            </Link>
                        </NavbarItem>
                    ))
                }
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="flex items-center">
                <RxAvatar className="text-accent text-2xl mr-1"></RxAvatar>
                   <div>
                   <Link className="text-white hover:text-accent" href="/login">Login</Link>
                   <span className="mx-1">or</span>
                   <Link className="text-white" href="/register">Register</Link>
                   </div>
                </NavbarItem>
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
        // <Navbar
        //     isBordered
        //     maxWidth="full"
        // isMenuOpen={isMenuOpen}
        // onMenuOpenChange={setIsMenuOpen}
        // >
        //     <NavbarContent className="sm:hidden" justify="start">
        //         <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        //     </NavbarContent>

        //     <NavbarContent className="sm:hidden pr-3" justify="center">
        //         <NavbarBrand>
        //             {/* <AcmeLogo /> */}
        //             <p className="font-bold text-inherit">ACME</p>
        //         </NavbarBrand>
        //     </NavbarContent>

        //     <NavbarContent className="hidden sm:flex gap-4" justify="center">
        //         <NavbarBrand>
        //             {/* <AcmeLogo /> */}
        //             <p className="font-bold text-inherit">ACME</p>
        //         </NavbarBrand>

        //     </NavbarContent>

        //     <NavbarContent justify="end">
        //         <NavbarItem className="hidden lg:flex">
        //             <Link href="#">Login</Link>
        //         </NavbarItem>
        //         <NavbarItem>
        //             <Button as={Link} color="warning" href="#" variant="flat">
        //                 Sign Up
        //             </Button>
        //         </NavbarItem>
        //     </NavbarContent>

        //     <NavbarMenu>
        //         {navItems.map(({ title, path }, idx) => (
        //             <NavbarMenuItem
        //                 key={idx}>
        //                 <Link
        //                     className="w-full"
        //                     color={
        //                         idx === 2 ? "warning" : idx === navItems.length - 1 ? "danger" : "foreground"
        //                     }
        //                     href={path}
        //                     size="lg"
        //                 >
        //                     {title}
        //                 </Link>
        //             </NavbarMenuItem>
        //         ))}
        //     </NavbarMenu>
        // </Navbar>
    )
}
