// File: pages/404.js or pages/_not-found.js
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import errorAnimation from '../../public/404-error.json'; // Path to your 404 animation file
import Link from 'next/link';

// Dynamically import the Player component to avoid SSR issues
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), { ssr: false });

export default function NotFound() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Update state after the component mounts on the client
  }, []);

  if (!isClient) {
    return null; // Return nothing until the client-side component is loaded
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      {/* Lottie animation */}
      <Player
        autoplay
        loop
        src={errorAnimation}
        style={{ height: '300px', width: '300px' }}
      />
      {/* Title */}
      <h1 className="mt-6 text-3xl font-bold text-accent">Page Not Found</h1>
      {/* Description */}
      <p className="mt-2 text-lg text-gray-600">
        The page you’re looking for doesn’t exist or was removed.
      </p>
      {/* Link to return to homepage */}
      <Link className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-hoverPrimary" href="/">
        Return to Homepage
      </Link>
    </section>
  );
}

// For SSR/SSG: Ensure no SSR-related issues during build
export async function getStaticProps() {
  return {
    props: {},
  };
}
