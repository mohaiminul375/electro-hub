'use client'
import dynamic from 'next/dynamic';
const LottiePlayer = dynamic(() => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), { ssr: false });
export default function Loading() {
    return (
        <section className='flex items-center justify-center'>
            <LottiePlayer
                autoplay
                loop
                src="/loading.json"
                style={{ height: 'auto' }}
                className="w-full max-w-full"
            />
        </section>
    )
}
