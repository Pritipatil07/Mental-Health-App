import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import NavbarComponent from './NavbarComponent';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Animation2 from '../assets/Animation2.lottie';

const Therapist = () => {
    const { user } = useAuth0();
    const userName = user?.name || 'User';
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);

        setInput('');
        setIsTyping(true);

        try {
            const response = await axios.post('http://localhost:5000/chat', {
                userName,
                message: input,
            });

            setMessages([
                ...newMessages,
                { role: 'assistant', content: response.data.reply },
            ]);
        } catch (error) {
            console.error('Error communicating with therapist:', error);
            setMessages([
                ...newMessages,
                { role: 'assistant', content: "Sorry, something went wrong." },
            ]);
        }

        setIsTyping(false);

    };

    return (
        <div>
            <NavbarComponent />
            <div className="flex flex-col items-center justify-center min-h-screen bg-customBg">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 -mt-20">
                    Your Personal AI Therapist
                </h2>
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl flex flex-col p-4 h-[520px]">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`rounded-lg p-2 max-w-2xl text-md ${msg.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="rounded-lg p-3 max-w-xs bg-gray-200 text-gray-800">
                                    <DotLottieReact
                                        src={Animation2}
                                        loop
                                        autoplay
                                        style={{ height: '20px', width: '100px' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Input Section */}
                    <div className="flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Therapist;
