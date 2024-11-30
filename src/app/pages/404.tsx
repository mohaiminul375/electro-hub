import React from 'react';
import Link from 'next/link';
import { Player } from '@lottiefiles/react-lottie-player';
import errorAnimation from '../../../Public/404-error.json';

const Custom404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <Player
                autoplay
                loop
                src={errorAnimation}
                style={{ height: '300px', width: '300px' }}
            />
            <h1 className="mt-6 text-3xl font-bold text-gray-700">Page Not Found</h1>
            <p className="mt-2 text-lg text-gray-600">
                The page you’re looking for doesn’t exist or was removed.
            </p>
            <Link href="/">
                <a className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
                    Return to Homepage
                </a>
            </Link>
        </div>
    );
};

export default Custom404;
