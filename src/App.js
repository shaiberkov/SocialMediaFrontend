
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import ProfilePage from './ProfilePage';
import './App.css';
import Navbar from "./Navbar";
import SearchPage from "./SearchPage";
import PostForm from "./PostForm";
import Home from "./Home";
import {UserProvider} from "./UserContext";
import {FeedProvider} from "./FeedContext";
import {UserFollowingProvider} from "./UserFollowingContext";


function App() {


    // מגדיר אילו נתיבים לא יראו את ה־Navbar
    // const hideNavbar = location.pathname === '/signup' || location.pathname === '/login';
    return (
        <UserFollowingProvider>
        <UserProvider>
            <Router>
            <div className="App">
                {/*{!hideNavbar && <Navbar />}*/}
                <Routes>
                    <Route path="/" element={<Navigate to="/signup" />} />
                    <Route path="/signup" element={<SignupForm />} />

                    <Route path="/login" element={<LoginForm />} />
                    {/*<Route path="/search" element={<SearchPage />} />*/}



                </Routes>



                <Routes>
                    <Route
                        path="/postform"
                        element={
                            <>
                                <PostForm />
                                <Navbar />
                            </>
                        }
                    />
                </Routes>
                <FeedProvider>
                        <Routes>
                            <Route
                                path="/search"
                                element={
                                    <>
                                        <SearchPage />
                                        <Navbar />
                                    </>
                                }
                            />
                        </Routes>

                    <Routes>
                        <Route
                            path="/profilepage"
                            element={
                                <>
                                    <ProfilePage />
                                    <Navbar />
                                </>//TODO לטבל בנאב באר
                            }
                        />
                    </Routes>
                    <Routes>
                    <Route
                        path="/home"
                        element={
                            <>
                                <Home />
                                <Navbar />
                            </>
                        }
                    />
                </Routes>
                </FeedProvider>


            </div>
        </Router>
        </UserProvider>
        </UserFollowingProvider>

    );
}

export default App;
