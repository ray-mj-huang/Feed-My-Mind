import React, { useState } from 'react';
import {
  collection, setDoc, doc,
} from 'firebase/firestore';
// import colorData from './color-data.json';
import ColorList from './ColorList';
import AddColorForm from './AddColorForm';
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
  console.log(`安安！, id: ${newUserRef.id}`);
}

function MyForm() {
  const [textarea, setTextarea] = useState('');

  const handleChange = (e) => {
    setTextarea(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    alert(`你輸入的值是: ${textarea}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-hidden="true"
      style={{ margin: '200px auto' }}
    >
      <textarea value={textarea} onChange={handleChange} />
      <input type="submit" />
    </form>
  );
}

function App() {
  return (
    <div className="App">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <button type="submit" onClick={submitData}>firebase 寫入測試</button>
      <MyForm />
      <AddColorForm />
      <ColorList />
    </div>
  );
}

export default App;
