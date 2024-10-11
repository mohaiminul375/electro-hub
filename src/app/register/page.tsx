"use client"
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { Divider, Input } from '@nextui-org/react';
import auth_animation from "../../../public/auth.json";
import SocialLogin from "../Components/Shared/SocialLogin";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
type Inputs = {
    user_name: string,
    email: string,
    password: string,
}



export default function Page() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    // react_hook_form
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = user_info => console.log(user_info);



    console.log(errors)






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

            {/* Register form */}
            <div>
                <div className='lg:w-[90%] mx-auto border-2 py-10 px-2 md:px-10 rounded-md shadow-2xl border-primary'>
                    <h2 className='text-center text-3xl font-bold text-accent'>Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email input */}
                        <div>
                            <label className="block mb-1 text-accent text-base">Enter Your Name</label>
                            <Input
                                type="text"
                                variant='flat'
                                label="Name"
                                color='primary'
                                className='text-accent'
                                {...register("user_name", { required: 'name is required' })}
                            />
                            {errors.user_name && (
                                <span className="text-red-500 text-sm">*{errors.user_name.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-accent text-base">Enter Your Email</label>
                            <Input
                                type="email"
                                variant='flat'
                                label="Email"
                                color='primary'
                                className='text-accent'
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address"
                                    }
                                })}
                            />
                            {/* email error */}
                            {errors.email && (
                                <span className="text-red-500 text-sm">*{errors.email.message}</span>
                            )}
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
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long'
                                    }
                                })}
                            />
                            {/* password error */}
                            {errors.password && (
                                <span className="text-red-500 text-sm">*{errors.password.message}</span>
                            )}
                        </div>
                        <div className='mt-5 '>
                            <button className='w-full
                              py-2 bg-primary text-white rounded-md
                              hover:rounded-2xl duration-700'>Register</button>
                        </div>
                    </form>
                    <div className=''>
                        <Divider className="my-4" />
                        {/* social */}
                        <SocialLogin />
                        <div className='mt-5'>
                            <p className='text-center
                            text-base'>Already have an account? Please <Link className='text-accent hover:underline' href='/login' >Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

