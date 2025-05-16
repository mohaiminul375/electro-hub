'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import error from '../../public/error.jpg';

const Error = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center px-4 rounded-md bg-white">
            <head>
                <title>Electro-Hub | Error Page</title>
            </head>
            <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                <h1 className="text-6xl font-bold text-primary">Oops!</h1>
                <h2 className="text-3xl font-semibold text-gray-800">404 - Page Not Found</h2>
                <p className="text-gray-600">
                    The page you are looking for doesn&apos;t exist or has been moved.
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
                >
                    Go Home
                </button>
            </div>
            <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                <Image
                    src={error}
                    alt="Error illustration"
                    width={500}
                    height={300}
                    className="object-contain max-h-[200px] md:max-h-[500px] rounded-md"
                />
            </div>
        </div>
    );
};

export default Error;
