
import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from "axios";
import {UserContext} from "./UserContext";
import {UserFollowingContext} from "./UserFollowingContext";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const { user,setUser } = useContext(UserContext);
    const {userfollowing, setuserfollowing}=useContext(UserFollowingContext)
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        // בדיקת שם משתמש
        if (!username) {
            newErrors.username = 'Username is required.';
        }

        // בדיקת סיסמה
        if (!password) {
            newErrors.password = 'Password is required.';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const response = await axios.post(`http://localhost:8080/api/users/login?username=${username}&password=${password}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (response.data.success) {
                await  getUser();
                await getUserFollowing();
                //אני צריך שזה יחכה עד שהיוזר לא יהיה null

               // console.log('Response:', response.data);
                setUsername('');
                setPassword('');
            }
            else {
                setServerMessage(response.data.message);
            }
        }
    };
    const getUserFollowing = async () => {
        const response = await axios.get(`http://localhost:8080/api/follow/following/${username}`);
        setuserfollowing(response.data.data);
    }
   const getUser = async ()=>{
       const user = await axios.get(`http://localhost:8080/api/users/user?username=${username}`);
      setUser(user.data);


   }
    useEffect(() => {
        if (user) {
            navigate('/profilepage');
        }
    }, [user, navigate]);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="form-title">Login</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={`form-input ${errors.username ? 'input-error' : ''}`}
                        placeholder="Enter your username"
                    />
                    {errors.username && <p className="error-message">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`form-input ${errors.password ? 'input-error' : ''}`}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                {serverMessage && <p className="error-message">{serverMessage}</p>}
                <button type="submit" className="form-button">Login</button>
                <p className="toggle-text">
                    Don't have an account?
                    <button
                        type="button"
                        className="toggle-button"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
