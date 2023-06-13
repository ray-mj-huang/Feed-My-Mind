/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import {
  useState, useEffect, createContext, useContext,
} from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const UserInfoContext = createContext();
export const useUserInfo = () => useContext(UserInfoContext);

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUserInfo(userData);
      } else {
        setUserInfo(null);
      }
    });
  }, [auth]);

  function handleSignOut() {
    signOut(auth).then(() => {
      setUserInfo(null);
    })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  return (
    <UserInfoContext.Provider value={{ userInfo, handleSignOut }}>
      {children}
    </UserInfoContext.Provider>
  );
}
