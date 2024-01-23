import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const SERVER_URL="https://www.api.thler.com"; //http://localhost:3001
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.post('/profile'); // Adjust the endpoint as needed
                if (response.data) {
                    setUser(response.data); // Set user data from response
                } else {
                    setUser(null); // No user data available
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null); // In case of error, set no user
            }
            setLoading(false); // Set loading to false after the fetch operation
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading , SERVER_URL}}>
            {children}
        </UserContext.Provider>
    );
}
