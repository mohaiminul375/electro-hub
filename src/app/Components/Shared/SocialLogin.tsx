import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export default function SocialLogin() {
    const handleSocialLogin = async (provider: string) => {
        const res = await signIn(provider);
        console.log('social login', res)

    }
    return (
        <section>
            <div className="flex justify-between gap-3 flex-col md:gap-2">
                <button
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center gap-2 border border-gray-800 rounded-md bg-white font-semibold px-2 py-2 hover:bg-primary hover:text-white duration-700"
                >
                    <Image src="/assets/google.png" alt="google" width={30} height={30} />
                    <span>Sign in with Google</span>
                </button>
                <button
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center gap-2 border border-gray-800 rounded-md bg-white font-semibold px-2 py-2 hover:bg-primary hover:text-white duration-700"
                >
                    <Image src="/assets/facebook.png" alt="facebook" width={30} height={30} />
                    <span>Sign in with Facebook</span>
                </button>
            </div>
        </section>
    )
}
