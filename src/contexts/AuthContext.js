import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../firebase';

const AuthContext = React.createContext();

// function to grab the context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // grab the user from firebase authentication
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);

      // if user exists
      if (user) history.push('./chats');
    });
  }, [user, history]);

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
