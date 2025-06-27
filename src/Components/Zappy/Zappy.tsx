'use client'
import React, { useState } from 'react';
import { IoMdChatboxes } from "react-icons/io";
const ChatbaseSupport = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);
    return (
        <div>
            {/* Floating Button */}
            <button
                className="fixed bottom-[100px] right-[30px] bg-[#4CAF50] text-white border-0 rounded-full w-[60px] h-[60px] text-[28px] cursor-pointer z-50  flex justify-center items-center"
                onClick={toggleChat}
                title="Live Chat Support"
            >
                <IoMdChatboxes />
            </button>

            {/* Chatbox */}
            {isOpen && (
                <div
                    className="fixed bottom-[190px] mx-2 md:right-5 w-[350px] h-[500px] shadow-md z-[9999] bg-white rounded-[10px] overflow-hidden"
                >
                    <iframe
                        src="https://www.chatbase.co/chatbot-iframe/I9B48X7ROqfmkzw7giwfI"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="ChatbaseBot"
                    />
                </div>
            )}
        </div>
    );
};

export default ChatbaseSupport;
