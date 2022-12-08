/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

// import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState, useEffect } from 'react';

// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
import './App.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Notes from './pages/Notes';
// import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [red, setRed] = useState('red');
  const [userInfo, setUserInfo] = useState('');

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
    <>
      <Navbar
        changePage={setCurrentPage}
        signOut={() => signOutFunction()}
        userInfo={userInfo}
      />
      {currentPage === 'Home' && <Home color={red} setColor={setRed} userInfo={userInfo} />}
      {currentPage === 'Notes' && <Notes userInfo={userInfo} />}
      {/* {currentPage === 'Dashboard' && <Dashboard />} */}
    </>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/notes" element={<Notes />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
