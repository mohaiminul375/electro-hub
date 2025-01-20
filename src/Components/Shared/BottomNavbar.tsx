'use client'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { BiSupport } from 'react-icons/bi';
import { FaCartPlus, FaUserCircle } from 'react-icons/fa';
import {
    MdAdminPanelSettings,
    // MdArrowDropDownCircle 
} from 'react-icons/md';

const BottomNavbar = () => {
    const session = useSession();
    // const isAdmin = session?.data?.user?.role === 'admin';
    const user_email = session?.data?.user?.email;
    return (
        <nav className="md:hidden bg-accent fixed bottom-0 z-50 h-10 w-full">
            <div className="flex justify-between items-center text-white gap-5 px-10 h-full">
                <Link href='/support'>
                    <BiSupport className="text-2xl md:text-3xl" />
                </Link>
                <Link href='/cart'>
                    <FaCartPlus className="text-2xl md:text-3xl" />
                </Link>
                <Link href="/admin-dashboard">
                    <MdAdminPanelSettings className="text-2xl md:text-3xl" />
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
                                    src="https://i.ibb.co.com/9W3MKLY/avatar.png"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">
                                        {user_email}

                                    </p>
                                </DropdownItem>
                                <DropdownItem key="my-account">
                                    <Link href='/user/profile'>
                                        My Account
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="my-orders">
                                    <Link href='/my-orders'>
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
        </nav>
    );
};

export default BottomNavbar;