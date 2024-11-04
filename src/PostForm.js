
import React, {useContext, useState} from 'react';
import './PostForm.css';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import {UserContext} from "./UserContext";

function PostForm() {
    const [postContent, setPostContent] = useState('');
    const { user, setUser } = useContext(UserContext);



    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const response=await axios.post(`http://localhost:8080/api/posts/create?username=${user.data.username}&content=${postContent}`)
        const newPost=response.data.data;
        console.log('Response from server:', response.data.data);
        setUser((prevUser) => ({
            ...prevUser,
            data: {
                ...prevUser.data,
                posts: [...prevUser.data.posts, newPost], // הוספת הפוסט החדש
            },
        }));
        console.log(response.data);
            setPostContent('');

    };

    return (
        <div className="post-form-container">
            <form onSubmit={handlePostSubmit}>
                <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Write your post here..."
                />
                <button type="submit" disabled={postContent.trim().length === 0} className="button">
                    <FontAwesomeIcon icon={faShareSquare} />
                </button>
            </form>
        </div>
    );
}

export default PostForm;
