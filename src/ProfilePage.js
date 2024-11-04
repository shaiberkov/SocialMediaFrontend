
import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShareSquare, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {UserContext} from "./UserContext";
import axios from "axios";
import {FeedContext} from "./FeedContext";

function ProfilePage() {
    const navigate = useNavigate();
    const [imageURL, setImageURL] = useState('');
    const { user, setUser } = useContext(UserContext);
    const { feed, setfeed } = useContext(FeedContext);


    const handleLogout = () => {
        setUser(null)
        setfeed([]);

        navigate('/login');
    };

    const handleImageChange = (e) => {
        setImageURL(e.target.value);
    };

    const handleAddImage = async () => {
        const response=await axios.put(`http://localhost:8080/api/users/${user.data.username}/profile-image?imageUrl=${imageURL}`)
        setUser((prevUser) => ({
            ...prevUser,
            data: {
                ...prevUser.data,
                profileImageUrl: imageURL, // הנחה שיש שדה בשם profileImage
            },
        }));
        setImageURL("")
    };


    return (
        <div className="profilepage-container">
            <button onClick={handleLogout} className="logout-button">
                <FontAwesomeIcon icon={faSignOutAlt}/>
            </button>
            <div className="stats-container">
                <div className="stat">
                    <span className="stat-number">{user.data.posts.length}</span>
                    <span className="stat-label">פוסטים</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{user.data.following.length}</span>
                    <span className="stat-label">עוקבים</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{user.data.followers.length}</span>
                    <span className="stat-label">עקובים</span>
                </div>
            </div>
            <div className="username-container">
                <span>{user.data.username}</span>
            </div>
            <div className="posthead-container">
                <span>posts</span>
            </div>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter profile image URL"
                    value={imageURL}
                    onChange={handleImageChange}
                />
                <button onClick={handleAddImage}>Add Image</button>
            </div>
            <div className="profile-image-container">
                {user.data.profileImageUrl ? (
                    <img src={user.data.profileImageUrl} alt="Profile" className="profile-image"/>
                ) : (
                    <div className="profile-image-placeholder"></div>
                )}
            </div>
            {user.data.posts.length > 0 && (
                <div className="posts1-container">
                    {user.data.posts
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


export default ProfilePage;
