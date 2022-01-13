import { createContext, useState } from "react";
import { useContext } from "react/cjs/react.development";

export const UserContext = createContext();

export const useCurrentUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const loggedIn = !!currentUser.username;

  const logOut = () => {
    setCurrentUser({});
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, loggedIn, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
