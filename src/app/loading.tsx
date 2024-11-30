'use client'
import { Controls, Player } from '@lottiefiles/react-lottie-player';
import React from 'react';
import spinner from '../../Public/loading.json';

export default function Loading() {
    return (
        <section className='flex items-center justify-center'>
            <Player
                autoplay={true}
                loop={true}
                src={spinner}
                style={{ height: 'auto' }}
                className='w-full max-w-full'
            />
            <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
        </section>
    )
}
