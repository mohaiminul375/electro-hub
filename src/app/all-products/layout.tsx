import Link from 'next/link';
import React, { ReactNode } from 'react';
interface LayoutProps {
    children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <div className='hidden lg:flex justify-evenly items-center gap-8 mb-10 h-10 text-lg font-semibold shadow-lg border-2'>
                <Link href='/smart-phone'>Smart-Phone</Link>
                <Link href='/smart-watch'>Smart-Watch</Link>
                <Link href='/laptop'>Laptop</Link>
                <Link href='/monitor'>Monitor</Link>
                <Link href='/accessories'>Accessories</Link>
                <Link href='/smart-tv'>Smart-Tv</Link>
            </div>
            {children}
        </div>
    );
};

export default layout;