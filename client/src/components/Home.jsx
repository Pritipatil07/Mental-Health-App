import React from 'react';
import NavbarComponent from './NavbarComponent';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Animation2 from '../assets/Animation1.lottie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Home2 from './Home2';
import Home3 from './Home3';

const Home = () => {
    return (
        <div className="bg-customBg">
            <NavbarComponent />
            {/* Main Content */}
            <div className="h-screen mb-2 lg:mb-6 flex flex-col md:flex-row items-center justify-center w-full mt-10 lg:-mt-20 md:mt-20">
                {/* Left Column */}
                <div className="flex-1 flex flex-col items-center text-center px-6 sm:px-4 lg:mt-24">
                    <h1 className="font-extrabold font-serif lg:text-6xl md:text-5xl text-3xl">Welcome to</h1>
                    <h1 className="font-extrabold font-serif lg:text-6xl md:text-5xl text-3xl mb-4">Mindfulness.</h1>
                    <h1 className="text-md sm:text-sm md:text-lg text-gray-700 font-semibold mx-4 sm:mx-2 md:mx-0">
                        Welcome to our mental health app, where you can anonymously chat, read about mental health related topics,
                        and receive personalized support through quizzes and an AI assistant.
                        Prioritize your emotional well-being discreetly and effectively with our compassionate community.
                    </h1>
                </div>

                {/* Right Column */}
                <div className="flex-1 flex justify-center md:justify-end mt-8 sm:mt-4 md:mt-0">
                    <DotLottieReact
                        src={Animation2}
                        loop
                        autoplay
                        style={{ height: '350px', width: '350px' }}
                        className="sm:h-64 sm:w-64 md:h-[500px] md:w-[500px] lg:h-[700px] lg:w-[800px]"
                    />
                </div>
            </div>
            <div>
                <Home2 />
                <Home3 />
            </div>
        </div>
    );
};

export default Home;
