
import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';
import axios from 'axios';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        // בדיקת שם משתמש
        if (!username) {
            newErrors.username = 'Username is required.';
        } else if (!/^[A-Za-z0-9]{3,20}$/.test(username)) {
            newErrors.username = 'Username must be 3-20 characters long and contain only letters and numbers.';
        }

        // בדיקת סיסמה
        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.';
        }

        // בדיקת אימות סיסמה
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {

            const response = await axios.post(`http://localhost:8080/api/users/register?username=${username}&password=${password}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (response.data.success) {
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                navigate('/login');
            } else {
                setServerMessage(response.data.message);
            }
        }
    };

            return (
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="signup-form">
                        <h2 className="form-title">Sign Up</h2>
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
                        <div className="form-group">
                            <label className="form-label" htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        </div>
                        {serverMessage && <p className="error-message">{serverMessage}</p>}
                        <button type="submit" className="form-button">Sign Up</button>
                        <p className="toggle-text">
                            Already have an account?
                            <button
                                type="button"
                                className="toggle-button"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                        </p>
                    </form>
                </div>
            );
        }


        export default SignupForm;

