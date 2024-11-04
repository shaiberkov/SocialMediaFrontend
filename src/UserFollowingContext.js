import React, { createContext, useState } from 'react';

export const UserFollowingContext = createContext();

export const UserFollowingProvider = ({ children }) => {
    const [userfollowing, setuserfollowing] = useState([]);

    return (
        <UserFollowingContext.Provider value={{ userfollowing, setuserfollowing }}>
            {children}
        </UserFollowingContext.Provider>
    );
};
