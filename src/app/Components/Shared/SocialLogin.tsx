import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

export default function SocialLogin() {
    const { status } = useSession();
    console.log('satus from', status)
    const router = useRouter()
    const handleSocialLogin = async (provider: string) => {
        const res = await signIn(provider, { redirect: false });
        console.log('social login', res)
        setTimeout(() => {
            if (status === 'authenticated') {
                router.push('/');
                return toast.success('Login successfully');
            }
        }, 100);

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
