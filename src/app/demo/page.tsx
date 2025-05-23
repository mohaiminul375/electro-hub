export const dynamic = 'force-dynamic';
const page = () => {
    return (
        <section
            className="flex items-center justify-center h-screen"
            style={{ height: 'calc(100vh - 200px)' }}
        >
            {/* <Player
                autoplay
                loop
                src={error}
                style={{ height: '50%', width: '80%' }}
                className="max-w-[600px] max-h-[400px]"
            />
            <Controls
                visible
                buttons={['play', 'repeat', 'frame', 'debug']}
            /> */}
        </section>
    );
};

export default page;

// 'use client'
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import errorAnimation from '../../public/404-error.json';
// import dynamic from 'next/dynamic';

// // Dynamically import Player to avoid SSR errors
// const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), { ssr: false });

// export default function NotFound() {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     // Set isClient to true only on the client side
//     setIsClient(true);
//   }, []);

//   // Ensure that Player component and other client-side logic runs only on the client
//   if (!isClient) {
//     return null;
//   }

//   return (
//     <section className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
//       {/* Conditionally render Player only on the client */}
//       {isClient && (
//         <Player
//           autoplay
//           loop
//           src={errorAnimation}
//           style={{ height: '300px', width: '300px' }}
//         />
//       )}
//       <h1 className="mt-6 text-3xl font-bold text-accent">Page Not Found</h1>
//       <p className="mt-2 text-lg text-gray-600">
//         The page you’re looking for doesn’t exist or was removed.
//       </p>
//       <Link className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-hoverPrimary" href="/">
//         Return to Homepage
//       </Link>
//     </section>
//   );
// }
// // Use getServerSideProps to ensure server-side rendering doesn't interfere with client-side code
// export async function getServerSideProps() {
//   return {
//     props: {},
//   };
// }