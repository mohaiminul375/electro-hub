"use client"
import { Controls, Player } from "@lottiefiles/react-lottie-player";
// import { Input } from "postcss";
import { Divider, Input } from '@nextui-org/react';
import auth_animation from "../../../public/auth.json";
import SocialLogin from "../Components/Shared/SocialLogin";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
export default function Page() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };
    return (
        <section className='grid md:grid-cols-2 gap-5 mt-5'>
            {/* Lottie animation */}
            <div className='hidden md:flex'>
                <Player
                    autoplay={true}
                    loop={true}
                    src={auth_animation}
                    style={{ height: 'auto' }}
                    className='md:w-full lg:w-[90%] shadow-2xl'
                />
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </div>

            {/* Login form */}
            <div>
                <div className='lg:w-[90%] mx-auto border-2 py-10 px-2 md:px-10 rounded-md shadow-2xl border-primary'>
                    <h2 className='text-center text-3xl font-bold text-accent'>Register</h2>
                    <form>
                        {/* Email input */}
                        <div>
                            <label className="block mb-1 text-accent text-base">Enter Your Name</label>
                            <Input
                                type="text"
                                variant='flat'
                                label="Name"
                                color='primary'
                                className='text-accent'
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-accent text-base">Enter Your Email</label>
                            <Input
                                type="email"
                                variant='flat'
                                label="Email"
                                color='primary'
                                className='text-accent'
                            />
                        </div>

                        {/* Password input */}
                        <div className="mt-4">
                            <label className="block mb-2 text-accent">Enter Your Password</label>
                            <Input
                                fullWidth
                                label="Password"
                                color='primary'
                                variant='flat'
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                        aria-label="toggle password visibility"
                                    >
                                        {isVisible ? (
                                            <FaRegEye
                                                className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaRegEyeSlash
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
                              py-2 bg-primary text-white rounded-md
                              hover:rounded-2xl duration-700'>Login</button>
                        </div>
                    </form>
                    <div className=''>
                        <Divider className="my-4" />
                        {/* social */}
                        <SocialLogin />
                        <div className='mt-5'>
                            <p className='text-center
                            text-base'>New Here? please<Link className='text-accent hover:underline' href='/register' >Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

