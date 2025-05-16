"use client"
import { Divider, Input } from '@nextui-org/react';
import SocialLogin from "../../components/Shared/SocialLogin";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { createUser } from "./api/route";
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(() => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), { ssr: false });
// import { AxiosError } from "axios";
interface Inputs {
    name: string,
    email: string,
    password: string,
}
interface CustomError extends Error {
    response?: {
        data?: {
            message?: string;
        };
    };
}


export default function Page() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };
    // route
    const router = useRouter();


    // react_hook_form
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (user_info) => {
        try {
            const res = await createUser(user_info);
            if (res.insertedId) {
                setTimeout(() => {
                    router.push('/login')
                }, 1000);
                return toast.success('Register successfully please login');
            }

        } catch (error) {
            // console.error("Error during user creation:", error);
            const customError = error as CustomError; // Type assertion

            const errorMessage = customError?.response?.data?.message || customError.message;
            if (errorMessage) {
                return toast.error(errorMessage)
            } else {
                toast.error('something went wrong please contact to support')
            }
        }

    }

    return (
        <section className='grid md:grid-cols-2 gap-5 mt-5 px-4 lg:px-8'>
             <head>
        <title>Electro-Hub | Register</title>
      </head>
            {/* Lottie animation */}
            <div className='hidden md:flex justify-center'>
                <LottiePlayer
                    autoplay
                    loop
                    src="/auth.json"
                    style={{ height: 'auto' }}
                    className="w-full max-w-full"
                />
            </div>

            {/* Register form */}
            <div>
                <div className='w-full max-w-[500px] mx-auto border-2 py-8 px-4 md:px-8 rounded-md shadow-2xl border-primary dark:bg-darkCard bg-white'>
                    <h2 className='text-center text-2xl md:text-3xl font-bold text-accent dark:text-white'>Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name input */}
                        <div className='mt-4'>
                            <label className="block mb-2 text-accent  text-base dark:text-white">Enter Your Name</label>
                            <Input
                                type="text"
                                variant='flat'
                                label="Name"
                                color='success'
                                className='text-accent'
                                {...register("name", { required: 'Name is required' })}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">*{errors.name.message}</span>
                            )}
                        </div>

                        {/* Image input */}
                        {/* <div className="mt-4">
                            <label className="block mb-2 text-accent text-base">Upload Your Image</label>
                            <Input
                                className='h-10'
                                variant='bordered'
                                type="file"
                                required
                            />
                        </div> */}

                        {/* Email input */}
                        <div className="mt-4">
                            <label className="block mb-2 text-accent text-base dark:text-white">Enter Your Email</label>
                            <Input
                                type="email"
                                variant='flat'
                                label="Email"
                                color='success'
                                className='text-accent'
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address"
                                    }
                                })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">*{errors.email.message}</span>
                            )}
                        </div>

                        {/* Password input */}
                        <div className="mt-4">
                            <label className="block mb-2 text-accent dark:text-white">Enter Your Password</label>
                            <Input
                                fullWidth
                                label="Password"
                                color='success'
                                variant='flat'
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                        aria-label="toggle password visibility"
                                    >
                                        {isVisible ? (
                                            <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long'
                                    }
                                })}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">*{errors.password.message}</span>
                            )}
                        </div>

                        {/* Submit button */}
                        <div className='mt-5'>
                            <button className='w-full py-2 bg-primary hover:bg-hoverPrimary text-white rounded-md hover:rounded-2xl duration-700'>
                                Register
                            </button>
                        </div>
                    </form>

                    {/* Divider and Social Login */}
                    <div className=''>
                        <Divider className="my-4" />
                        <SocialLogin />
                        <div className='mt-5'>
                            <p className='text-center text-base'>
                                Already have an account?{' '}
                                <Link className='text-accent dark:text-white hover:underline hover:text-hoverPrimary duration-700' href='/login'>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

