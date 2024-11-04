
import React, { useContext, useEffect, useRef } from 'react';
import './Home.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "./UserContext";
import { FeedContext } from "./FeedContext";
import axios from "axios";

function Home() {
    const navigate = useNavigate();
    const { user,setUser } = useContext(UserContext);
    const { feed, setfeed } = useContext(FeedContext);
    const hasFetched = useRef(false);

    const handleLogout = () => {
        setfeed([]);
        setUser(null);

        navigate('/login');
    };

    useEffect(() => {
        const fetchFeed = async () => {
            if (user && user.data && user.data.username) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/posts/feed/${user.data.username}`);
                    if (response.data.success) {
                        setfeed(response.data.data);
                    }
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            }
        };


        if (user && feed.length === 0 && !hasFetched.current) {
            fetchFeed();
            hasFetched.current = true;
        }

    }, [user, feed, setfeed]);
    return (
        <div className="home-page-container">
            <button className="logout-button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
            {feed.length > 0 && (
                <div className="posts-container">
                    {feed
                        .slice()
                        .sort((a, b) => b.id - a.id)
                        .map((post) => (
                            <div key={post.id} className="post">
                                <p>{post.content}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default Home;
