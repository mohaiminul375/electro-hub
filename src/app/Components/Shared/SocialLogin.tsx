import Image from 'next/image'
import React from 'react'

export default function SocialLogin() {
    return (
        <section>
            <div className="flex justify-between gap-3 flex-col md:gap-2">
                <button
                    className="flex items-center justify-center gap-2 border border-gray-800 rounded-md bg-white font-semibold px-2 py-2 hover:bg-primary hover:text-white duration-700"
                >
                    <Image src="/assets/google.png" alt="google" width={30} height={30} />
                    <span>Sign in with Google</span>
                </button>
                <button
                    className="flex items-center justify-center gap-2 border border-gray-800 rounded-md bg-white font-semibold px-2 py-2 hover:bg-primary hover:text-white duration-700"
                >
                    <Image src="/assets/facebook.png" alt="facebook" width={30} height={30} />
                    <span>Sign in with Facebook</span>
                </button>
            </div>
        </section>
    )
}
