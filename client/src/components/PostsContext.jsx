import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';

const socket = io('http://localhost:5000');
export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const {user} = useAuth0();
    const [posts, setPosts] = useState([]);
    const [replies, setReplies] = useState({});

    const fetchPosts = async () => {
        try {
            const postsResponse = await fetch('http://localhost:5000/posts');
            const postsData = await postsResponse.json();
            setPosts(postsData);
            const repliesMap = {};
            for (const post of postsData) {
                const repliesResponse = await fetch(`http://localhost:5000/replies/${post._id}`);
                const repliesData = await repliesResponse.json();
                repliesMap[post._id] = repliesData.map(reply => reply.content);
            }
            setReplies(repliesMap);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();

        socket.on('receivePost', (post) => {
            setPosts((prevPosts) => [...prevPosts, post]);
        });

        socket.on('receiveReply', (reply) => {
            setReplies((prevReplies) => ({
                ...prevReplies,
                [reply.postId]: [...(prevReplies[reply.postId] || []), reply.content],
            }));
        });

        socket.on('deletePost', (postId) => {
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
            setReplies((prevReplies) => {
                const updatedReplies = { ...prevReplies };
                delete updatedReplies[postId];
                return updatedReplies;
            });
        });

        return () => {
            socket.off('receivePost');
            socket.off('receiveReply');
            socket.off('deletePost');
        };
    }, [posts, replies]);

    const addPost = async (post) => {
        const res = await fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        });
        const data = await res.json();
        setPosts((prev) => [...prev, data]);
        socket.emit('newPost', data);
    };

    const addReply = async (postId, content) => {
        const reply = { postId, content, user:user.name };
        const res = await fetch(`http://localhost:5000/replies/${postId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reply),
        });
        const data = await res.json();

        setReplies((prevReplies) => ({
            ...prevReplies,
            [postId]: [...(prevReplies[postId] || []), data.content],
        }));

        socket.emit('newReply', data);
    };

    const deletePost = async (postId) => {
        await fetch(`http://localhost:5000/posts/${postId}`, { method: 'DELETE' });
        socket.emit('deletePost', postId);
    };

    return (
        <PostsContext.Provider value={{ posts, replies, addPost, addReply, deletePost }}>
            {children}
        </PostsContext.Provider>
    );
};
