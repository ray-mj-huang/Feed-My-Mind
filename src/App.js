/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

// import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from 'react';

// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  return (
    <>
      <Navbar
        changePage={setCurrentPage}
      />
      {currentPage === 'Home' && <Home />}
      {currentPage === 'Notes' && <Notes />}
      {currentPage === 'Dashboard' && <Dashboard />}
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
