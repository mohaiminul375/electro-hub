'use client'
import { Player } from '@lottiefiles/react-lottie-player';
import errorAnimation from '../../Public/404-error.json';
import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <Player
        autoplay
        loop
        src={errorAnimation}
        style={{ height: '300px', width: '300px' }}
      />
      <h1 className="mt-6 text-3xl font-bold text-accent">Page Not Found</h1>
      <p className="mt-2 text-lg text-gray-600">
        The page you’re looking for doesn’t exist or was removed.
      </p>
      <Link className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-hoverPrimary" href="/">
        Return to Homepage
      </Link>
    </section>
  )
}
