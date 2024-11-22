import React, { useState, useContext, useRef } from 'react';
import { PostsContext } from './PostsContext';
import NavbarComponent from './NavbarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from '@auth0/auth0-react';

const ShowPosts = () => {
    const { user } = useAuth0();
    const { posts, replies, addReply, deletePost } = useContext(PostsContext);
    const [replyInputs, setReplyInputs] = useState({});
    const [isReplying, setIsReplying] = useState({});
    const postRefs = useRef([]);
    const replyRefs = useRef({});

    const handleReplyClick = (postId) => {
        setIsReplying((prev) => {
            const newState = { ...prev, [postId]: !prev[postId] };
            if (newState[postId]) {
                // Focus the input field if it is opened
                setTimeout(() => {
                    replyRefs.current[postId]?.focus(); // Focus the input
                }, 0);
            }
            return newState;
        });
    };

    const handleReplySubmit = (e, postId) => {
        e.preventDefault();
        if (replyInputs[postId]?.trim()) {
            addReply(postId, replyInputs[postId]);
            setReplyInputs((prev) => ({ ...prev, [postId]: '' }));
            setIsReplying((prev) => ({ ...prev, [postId]: false }));
        }
    };

    return (
        <div className="space-y-5">
            <NavbarComponent />
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div
                        key={post._id}
                        className="bg-[#FFFFFF] border-2 border-gray-300 rounded sm:mx-4 lg:mx-20 mb-5"
                    >
                        <div className="flex flex-col lg:flex-row w-full h-full">
                            {/* Post Content */}
                            <div className="flex-1 p-10">
                                <div className="bg-[#F1F1F1] grid w-full">
                                    <div className="row-span-1 px-5 py-5 text-xl font-bold flex justify-between">
                                        <div>{post.title}</div>
                                        <div>
                                            {user && user.name === post.user && (
                                                <button onClick={() => deletePost(post._id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            )}
                                            {!user || user.name !== post.user ? (
                                                <button
                                                    onClick={() => handleReplyClick(post._id)}
                                                >
                                                    <FontAwesomeIcon icon={faReply} />
                                                </button>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="border p-5 h-fit text-black flex flex-col justify-between"
                                    ref={(el) => (postRefs.current[post._id] = el)}
                                >
                                    <div>{post.content}</div>
                                    <div className="text-gray-500 text-xs text-right mt-4 -mb-8">
                                        {post.dateOnly}
                                    </div>
                                </div>

                                {isReplying[post._id] && (
                                    <form
                                        onSubmit={(e) => handleReplySubmit(e, post._id)}
                                        className="mt-3"
                                    >
                                        <input
                                            ref={(el) => (replyRefs.current[post._id] = el)}
                                            type="text"
                                            value={replyInputs[post._id]}
                                            onChange={(e) => {
                                                setReplyInputs((prev) => ({
                                                    ...prev,
                                                    [post._id]: e.target.value,
                                                }));
                                            }}
                                            placeholder="Write a reply..."
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Submit Reply
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Replies Section */}
                            <div
                                className="p-5 w-full lg:w-1/3"
                                style={{
                                    maxHeight: postRefs.current[post._id]?.offsetHeight || 'auto',
                                }}
                            >
                                <div className="font-semibold h-20 text-xl bg-[#F1F1F1] flex items-center justify-center px-5 py-2">
                                    REPLIES
                                </div>
                                <div
                                    className="overflow-y-auto flex-1"
                                    style={{
                                        maxHeight:
                                            postRefs.current[post._id]?.offsetHeight + 40 || 'auto',
                                    }}
                                >
                                    {(replies[post._id] || []).map(
                                        (replyText, replyIndex) => (
                                            <div
                                                key={replyIndex}
                                                className="border p-4 h-fit text-black bg-white mb-1"
                                                style={{ whiteSpace: 'normal' }}
                                            >
                                                {replyText}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No posts available</p>
            )}
        </div>
    );
};

export default ShowPosts;
