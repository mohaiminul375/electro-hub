'use client'
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import error from '../../../Public/404-error.json'
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