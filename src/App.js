/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
import './App.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Notes from './pages/Notes';
import SignInCard from './components/SignInCard';

const boxStyle = {
  width: '500px', border: '1px solid white', borderRadius: '5px', padding: '20px', color: 'white', textAlign: 'center', margin: '10px',
};

function Container({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        background: '#1e1e1e',
        paddingTop: '75px',
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [userInfo, setUserInfo] = useState('');
  const [viewMode, setViewMode] = useState('ListView');

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
      ) : (
        <div style={boxStyle}>
          <SignInCard />
        </div>
      )}
    </Container>
  );
}

export default App;
