
import React, {useContext, useState, useEffect} from 'react';
import './SearchPage.css';
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {UserContext} from "./UserContext";
import {FeedContext} from "./FeedContext";
import {UserFollowingContext} from "./UserFollowingContext";

function SearchPage() {
    const [query, setQuery] = useState('');
    const [usersNames, setUsersNames] = useState([]);
    const [serverMessage, setServerMessage] = useState('');
    const { user, setUser } = useContext(UserContext);
    const { feed, setfeed } = useContext(FeedContext);
    const {userfollowing, setuserfollowing} = useContext(UserFollowingContext);
    const [userFollowingNames, setUserFollowingNames] = useState([]);

    const navigate = useNavigate();

    // טוען את רשימת המשתמשים שהמשתמש עוקב אחריהם כשנכנסים לקומפוננטה
    useEffect(() => {
        if (userfollowing.length > 0) {
            getAllUserFollowingNames();
        }
    }, [userfollowing]);




    const handleLogout = () => {
        setfeed([]);
        setUser(null);
        setuserfollowing([]);
        console.log('User logged out');
        navigate('/login');
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/users/search?query=${query}`);
            if (response.data.success) {
                getAllUserFollowingNames();
                const users = response.data.data;
                const usersNamesArray = users.map(user => user.username);
                setUsersNames(usersNamesArray);

                setQuery("");
                if (serverMessage) {
                    setServerMessage(null);
                }
            } else {
                if (usersNames.length > 0) {
                    setUsersNames([]);
                }
                setServerMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error during search:", error);
            setServerMessage("Error occurred while searching. Please try again.");
        }
    };

    const getAllUserFollowingNames = () => {
        if (userfollowing && Array.isArray(userfollowing)) {
            const userNames = userfollowing.map(user => user.username);
            setUserFollowingNames(userNames);

        } else {
            console.error("userfollowing is not an array:", userfollowing);
        }
    };

    const handleButtonClick = async (userName) => {
        try {
            console.log(userName);
            console.log(`${user.data.username} pressed the button.`);
            const response = await axios.post(`http://localhost:8080/api/follow/follow?followerUsername=${user.data.username}&followingUsername=${userName}`);
            if (response.data.success) {
                setUser((prevUser) => ({
                    ...prevUser,
                    data: {
                        ...prevUser.data,
                        following: [...prevUser.data.following, userName],
                    },
                }));
                const response = await axios.get(`http://localhost:8080/api/follow/following/${user.data.username}`);
                setuserfollowing(response.data.data);

                setUserFollowingNames((prevNames) => [...prevNames, userName]);
            } else {
                console.error("Error from server:", response.data.message);
            }
        } catch (error) {
            console.error("Network error:", error);
            setServerMessage("Network error occurred. Please try again later.");
        }
    };

    return (
        <div className="search-page-container">
            <button className="logout-button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="search-input"
                />
                <button type="submit" className="search-button" disabled={query.trim() === ""}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
            {serverMessage && <div className="server-message">{serverMessage}</div>}
            {usersNames.length > 0 && (
                <div className="users-container">
                    {usersNames.map((userName) => (
                        userName !== user.data.username && (
                            <div className="user-card" key={userName}>
                                <h3 className="user-name">{userName}</h3>
                                <button
                                    onClick={() => handleButtonClick(userName)}
                                    className={`user-button ${userFollowingNames.includes(userName) ? 'followed' : ''}`}
                                >
                                    {userFollowingNames.includes(userName) ? 'נעקב' : 'עקוב'}
                                </button>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchPage;

