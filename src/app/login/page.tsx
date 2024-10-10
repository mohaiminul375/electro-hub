"use client";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import auth_animation from "../../../public/auth.json";
import { Divider, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
// import { EyeFilledIcon, EyeSlashFilledIcon } from './EyeSlashFilledIcon';

export default function Page() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    return (
        <section className='grid md:grid-cols-2 gap-5 mt-5'>
            {/* Lottie animation */}
            <div>
                <Player
                    autoplay={true}
                    loop={true}
                    src={auth_animation}
                    style={{ height: 'auto', width: '75%' }}
                />
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </div>

            {/* Login form */}
            <div>
                <div className='w-3/4 mx-auto border py-10 px-10 rounded-md shadow-lg'>
                    <h2 className='text-center text-2xl font-bold text-accent'>Login</h2>
                    <form>
                        {/* Email input */}
                        <div>
                            <label className="block mb-2 text-accent">Enter Your Email</label>
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                fullWidth
                            />
                        </div>

                        {/* Password input */}
                        <div className="mt-8">
                            <label className="block mb-2 text-accent">Enter Your Password</label>
                            <Input
                                fullWidth
                                label="Password"
                                // variant="bordered"
                                placeholder="Enter your password"
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                        aria-label="toggle password visibility"
                                    >
                                        {isVisible ? (
                                            <FaRegEyeSlash
                                                className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaRegEye
                                                className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                className=""
                            />
                        </div>
                        <div className='mt-5 '>
                            <button className='w-full
                              py-2 bg-primary text-white rounded-md '>Login</button>
                        </div>
                    </form>
                    <div className=''>
                        <Divider className="my-4" />
                        <div className="flex justify-between flex-col gap-3 md:flex-row md:gap-0">
                            <button
                                className="flex items-center justify-center gap-2 border border-gray-800 rounded-md bg-white font-semibold px-2 py-2"
                            >
                                <Image src="/assets/google.png" alt="google" width={30} height={30} />
                                <span>Sign in with Google</span>
                            </button>
                            <button

                                className="flex items-center justify-center gap-2 border border-gray-800 rounded-md bg-white font-semibold px-2 py-2"
                            >
                                <Image src="/assets/facebook.png" alt="facebook" width={30} height={30} />
                                <span>Sign in with Facebook</span>
                            </button>
                        </div>
                        <div className='mt-5'>
                            <p className='text-center
                            text-base'>New Here? <Link className='text-accent hover:underline' href='#' >Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
