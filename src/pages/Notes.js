/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  doc, onSnapshot, updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

import '../App.css';

import Card from '../Card';
import ReadingMode from '../ReadingMode';

function Container({ children }) {
  return (
    <div
      style={{
        paddingTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(182.81deg, #757575 7.81%, #1B1B1B 92.91%)',
      }}
    >
      {children}
    </div>
  );
}

export default function Notes({ userInfo }) {
  const [newId, setNewId] = useState(1);
  const [cards, setCards] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [readingCardId, setReadingCardId] = useState(0);
  const [viewMode, setViewMode] = useState('ListView');

  // const [userInfo, setUserInfo] = useState('');

  // useEffect(() => {
  //   onAuthStateChanged(auth, (userData) => {
  //     if (userData) {
  //       // eslint-disable-next-line no-console
  //       console.log(userData);
  //       setUserInfo(userData);
  //     } else {
  //       // eslint-disable-next-line no-console
  //       console.log('使用者還沒登入噢');
  //       setUserInfo(null);
  //       setCards([]);
  //     }
  //   });
  // }, [auth]);

  useEffect(() => {
    if (userInfo) {
      const ref = doc(db, 'users', userInfo.uid);
      onSnapshot(ref, (querySnapshot) => {
        setCards(querySnapshot.data().user_notes);
      });
    }
  }, [userInfo]);

  function storeNotes() {
    const ref = doc(db, 'users', userInfo.uid);
    updateDoc(ref, { user_notes: cards });
  }

  useEffect(() => {
    if (cards.length > 0) { setNewId(cards[0].id + 1); }
    if (cards.length === 0) { setNewId(1); }
  }, [cards]);

  function handleOnRead(cardId) {
    setIsRead(true);
    setReadingCardId(cardId);
  }

  function handleDelete(cardId) {
    setCards(cards.filter((c) => c.id !== cardId));
  }

  const cardList = cards.map((c) => (
    <Card
      key={c.id}
      card={c}
      onRead={() => {
        handleOnRead(c.id);
      }}
      onDelete={() => handleDelete(c.id)}
      viewMode={viewMode}
    />
  ));

  const active = {
    color: 'red',
  };

  return (
    <Container>
      {isRead && (
        <ReadingMode
          cardId={readingCardId}
          cards={cards}
          setCards={setCards}
          setIsRead={setIsRead}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
        />
      )}

      {userInfo ? userInfo.email : '請登入噢～'}

      <p>{newId}</p>

      <button
        onClick={() => {
          setCards([{
            id: newId, isEdit: true, title: '標題', content: '內文', createdTime: null, editedTime: null, color: '#6BD677',
          }, ...cards]);
          setNewId((id) => id + 1);
          handleOnRead(newId);
          setIsCreating(true);
        }}
      >
        新增筆記
      </button>

      <button onClick={storeNotes}>把筆記寫入 FireStore</button>

      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex' }}>
          <button onClick={() => setViewMode('ListView')} style={viewMode === 'ListView' ? active : null}>List View</button>
          <button onClick={() => setViewMode('GridView')} style={viewMode === 'GridView' ? active : null}>Grid View</button>
        </div>
        <div
          className={viewMode === 'GridView' && 'cardContainer'}
        >
          {userInfo ? cardList : '這裡沒有汁料'}
        </div>
      </div>

    </Container>
  );
}
