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
        paddingTop: '50px',
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [userInfo, setUserInfo] = useState('');
  const [viewMode, setViewMode] = useState('ListView');

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
      />
      {userInfo ? (
        <>
          <div style={{ color: 'white' }}>{`哈囉，${userInfo.email} ！`}</div>
          <Notes userInfo={userInfo} viewMode={viewMode} />
        </>
      ) : (
        <div style={boxStyle}>
          <SignInCard />
        </div>
      )}
    </Container>
  );
}

export default App;
