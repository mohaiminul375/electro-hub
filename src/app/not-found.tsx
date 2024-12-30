'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import { useRouter } from 'next/navigation';

const Error = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-red-500">Oops! Something went wrong.</h1>
                <p className="text-gray-600 mt-2">We couldn&apos;t find the page&apos;looking for.</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded hover:rounded-2xl duration-300 transition-all"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Error;