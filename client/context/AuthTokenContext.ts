import React, { createContext } from 'react';

const AuthTokenContext = createContext<{
  authToken: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}>({
  authToken: '',
  setAuthToken: () => {
    return;
  }
});

export default AuthTokenContext;
