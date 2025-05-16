'use client'
import Image from 'next/image';
import Link from 'next/link';
import check from '../.../../../../../public/check.png';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize'
const PaymentSuccess = () => {

    const [showConfetti, setShowConfetti] = useState(true);
    const { width, height } = useWindowSize();
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative">
            <head>
                <title>Electro-Hub | Payment Success</title>
            </head>
            {showConfetti && <Confetti width={width} height={height} />}

            <div className='flex justify-center items-center px-4'>
                <div className="w-full max-w-sm bg-white dark:bg-darkCard rounded-lg shadow-lg p-6 text-center">

                    <Image className="mx-auto" src={check} alt="check" height={50} width={50} />
                    <h2 className="text-xl font-bold mt-4 text-green-600">Payment Successful!</h2>
                    <p className="text-gray-600 dark:text-white mt-2">Thank you for your payment. Your order has been successfully placed.
                        Wait for Approve.
                    </p>
                    <div className="mt-5 flex gap-4 justify-center">
                        <Link href="/">
                            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition w-full md:w-auto">
                                Go to Home
                            </button>
                        </Link>
                        <Link href="/my-orders">
                            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition w-full md:w-auto">
                                View Orders
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default PaymentSuccess;
