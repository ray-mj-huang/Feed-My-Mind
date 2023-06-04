/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
import styled from 'styled-components';
import './App.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Notes from './pages/Notes';
import Navbar from './components/Navbar';
import SignInCard from './components/SignInCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: #1e1e1e;
  padding-top: 75px;
  @media screen and (max-width: 900px) {
    padding-top: 60px;
  }
`;

function App() {
  const [userInfo, setUserInfo] = useState('');
  const [viewMode, setViewMode] = useState('GridView');

  const [newId, setNewId] = useState(1);
  const [cards, setCards] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [readingCardId, setReadingCardId] = useState(0);
  const [isChange, setIsChange] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        // eslint-disable-next-line no-console
        console.log(userData);
        setUserInfo(userData);
      } else {
        // eslint-disable-next-line no-console
        console.log('使用者還沒登入噢');
        setUserInfo(null);
        // setCards([]);
      }
    });
  }, [auth]);

  function signOutFunction() {
    signOut(auth).then(() => {
      // eslint-disable-next-line no-console
      console.log('已經登出囉！');
      setUserInfo(null);
    })
      .catch((error) => {
      // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  return (
    <Container>
      <Navbar
        signOut={() => signOutFunction()}
        userInfo={userInfo}
        setViewMode={setViewMode}
        setCards={setCards}
        setNewId={setNewId}
        setIsCreating={setIsCreating}
        setIsRead={setIsRead}
        setReadingCardId={setReadingCardId}
        newId={newId}
        cards={cards}
      />
      {userInfo ? (
        <Notes
          userInfo={userInfo}
          viewMode={viewMode}
          newId={newId}
          setNewId={setNewId}
          cards={cards}
          setCards={setCards}
          isRead={isRead}
          setIsRead={setIsRead}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          readingCardId={readingCardId}
          setReadingCardId={setReadingCardId}
          isChange={isChange}
          setIsChange={setIsChange}
        />
      ) : (<SignInCard />)}
    </Container>
  );
}

export default App;
