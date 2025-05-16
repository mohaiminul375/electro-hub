import Image from 'next/image';
import { Sevillana } from "next/font/google";
import Link from 'next/link';

const sevillana = Sevillana({
    weight: '400',
    subsets: ['latin'],
});

import facebook from '../../../public/social/facebook.png';
import twitter from '../../../public/social/twitter.png';
import youtube from '../../../public/social/youtube.png';
import github from '../../../public/social/github.png';
import ssl_commerz from '../../../public/SSL-Commerz.jpg';

export default function Footer() {
    return (
        <footer className='bg-accent mt-36 text-white pt-10 pb-10 md:pb-10 px-5 md:px-16'>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo and Social Links */}
                <div>
                    <div className="flex gap-2 items-center">
                        <Image
                            src="/assets/logo.webp"
                            alt="logo"
                            height={30}
                            width={30}
                            className="w-5 md:w-8 rounded-full"
                        />
                        <h2
                            className={`text-lg font-bold lg:text-3xl text-primary ${sevillana.className}`}
                        >
                            Electro-Hub
                        </h2>
                    </div>
                    {/* Social Links */}
                    <div className='flex gap-3 mt-5'>
                        <Link href='https://www.facebook.com' target='_blank'>
                            <Image src={facebook} alt='Facebook' height={30} width={30} />
                        </Link>
                        <Link href='https://x.com' target='_blank'>
                            <Image src={twitter} alt='Twitter' height={30} width={30} />
                        </Link>
                        <Link href='https://www.youtube.com' target='_blank'>
                            <Image src={youtube} alt='YouTube' height={30} width={30} />
                        </Link>
                        <Link href='https://github.com/mohaiminul375/electro-hub' target='_blank'>
                            <Image className='rounded-full' src={github} alt='YouTube' height={30} width={30} />
                        </Link>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                    <Link href='/'>About Us</Link>
                    <Link href='/support'>Support</Link>
                    <Link href='/'>Warranty Policy</Link>
                    <Link href='/'>Terms and Conditions</Link>
                    <Link href='/'>Privacy Policy</Link>
                </div>

                {/* Contact Information */}
                <div>
                    <p className="font-bold text-lg">Contact Us</p>
                    <p>Head Office:</p>
                    <h1 className="font-semibold">Dhanmondi, Dhaka</h1>
                    <p>+880 9638427483</p>
                </div>
            </section>

            {/* Footer Bottom Section */}
            <div className="mt-5 flex flex-col md:flex-col items-start justify-between">
                <div className="text-center md:text-left">
                    <p>Designed and Developed by</p>
                    <Link
                        target='_blank'
                        className='hover:underline hover:text-primary duration-300 transition-all'
                        href='https://mohaiminul-dev.web.app'>Mohaiminul Islam</Link>
                </div>
                <p className='text-sm mt-4'>Version1 | Last Update: 16-May-2025, 3.28 P.M (BDT)</p>

            </div>

            {/* SSL Commerz */}
            <div className="w-full md:w-auto mt-3">
                <Image
                    src={ssl_commerz}
                    alt="SSL Commerz"
                    layout="responsive"
                    width={50}
                    height={50}
                    className="w-full max-w-xs md:max-w-full rounded-md"
                />
            </div>

            {/* Footer Rights */}
            <div className='text-center text-white mt-5'>
                <h2>&copy; 2025 All rights reserved by Electro-Hub</h2>
            </div>
        </footer>
    );
}
