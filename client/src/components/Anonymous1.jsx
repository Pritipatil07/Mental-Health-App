import React, { useState, useContext } from 'react';
import { PostsContext } from './PostsContext';
import NavbarComponent from './NavbarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Animation3 from '../assets/Animation3.lottie';

const Anonymous1 = () => {
    const { user } = useAuth0();
    const { addPost } = useContext(PostsContext);
    const [newPost, setNewPost] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleClick = () => {
        setNewPost(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title, content, datePosted: new Date(), user: user.name };
        setTitle('');
        setContent('');
        addPost(newPost);
        setNewPost(false);
    };

    const handleCancel = () => {
        setNewPost(false);
    };

    return (
        <div>
            <NavbarComponent />
            <div className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row items-center lg:justify-center">
                <div className="absolute inset-0 bg-customBg"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center w-full max-w-7xl space-y-8 lg:space-y-0 lg:space-x-8 p-6 lg:p-0">
                    {/* Left Column */}
                    <div className="flex-1 text-left lg:pr-8">
                        {newPost ? (
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <h1 className="text-2xl sm:text-3xl font-bold my-3">Share a Post</h1>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-formBg h-12 sm:h-14 p-2 border-2 border-gray-300 rounded"
                                        required
                                    />
                                    <textarea
                                        placeholder="Content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full h-32 sm:h-44 bg-formBg p-2 border-2 border-gray-300 rounded"
                                        required
                                    />
                                    <div className="flex justify-between mt-4">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="btn border-2 border-gray-300 p-2 px-4 font-semibold cursor-pointer text-slate-500 bg-white"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn border border-indigo-500 p-2 px-4 font-semibold cursor-pointer text-white bg-indigo-500"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <p className="text-sm sm:text-xl font-medium leading-relaxed">
                                    Welcome to the Anonymous Sharing Portal, a safe place where you can express yourself freely without the fear of being judged.
                                    Here, you can share your thoughts, feelings, and experiences openly, knowing that your identity remains confidential. This platform is dedicated to fostering a supportive community where honesty and authenticity are valued.
                                    Whether you seek advice, want to share a personal story, or simply need a place to vent, our anonymous portal is here for you. Feel free to be yourself and connect with others who understand and respect your journey.
                                </p>
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 mt-8">
                                    <button
                                        onClick={handleClick}
                                        className="bg-transparent text-base sm:text-lg font-bold flex items-center hover:text-gray-600"
                                    >
                                        Share an Anonymous Post <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                                    </button>
                                    <Link to="/show-posts" className="hover:no-underline">
                                        <button className="bg-transparent text-base sm:text-lg font-bold flex items-center hover:text-gray-600">
                                            View all Anonymous Posts <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 flex justify-center items-center">
                        <DotLottieReact
                            src={Animation3}
                            loop
                            autoplay
                            className="h-96 w-96 sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] xl:h-[600px] xl:w-[600px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Anonymous1;
