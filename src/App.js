
import React from 'react';
import './App.css';
import {
  collection, setDoc, doc,
} from 'firebase/firestore';
import { db } from './firebase';

// 寫入 data 測試
async function submitData(e) {
  e.preventDefault();
  const newUserRef = doc(collection(db, 'collect-test'));
  await setDoc(newUserRef, {
    userId: newUserRef.id,
    userEmail: 'ray.mj.huang@gmail.com',
    userName: 'Ray',
    title: '來點測試！',
    article: 'React Context 應該這樣用，bla bla bla ... 嗚嗚。',
  });
  // eslint-disable-next-line
  console.log(`來點測試！, id: ${newUserRef.id}`);
}

function App() {
  return (
    <div className="App">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        style={{
          background: '#ccc',
          padding: '10px 20px',
          fontSize: '20px',
          borderRadius: '5px',
          margin: '200px auto',
          width: '100px',
        }}
        onClick={submitData}
        aria-hidden="true"
      >
        Test button
      </div>
    </div>
  );
}

export default App;
