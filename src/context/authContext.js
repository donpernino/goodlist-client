import React, { useState, useEffect } from 'react';
import app from '../base';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };