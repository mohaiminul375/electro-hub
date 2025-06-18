'use client'
import BotpressChat from '@/Components/BotpressChat'
import dynamic from 'next/dynamic'
// Lazy-load and disable SSR
// const BotpressChat = dynamic(() => import('@/components/BotpressChat'), {
//     ssr: false,
// })

export default function Home() {
    return (
        <main>
            <h1>Welcome to Electro Hub</h1>
            <BotpressChat />
        </main>
    )
}
