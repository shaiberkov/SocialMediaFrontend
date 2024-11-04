import React, { createContext, useState } from 'react';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [feed, setfeed] = useState([]);

    return (
        <FeedContext.Provider value={{ feed, setfeed }}>
            {children}
        </FeedContext.Provider>
    );
};
