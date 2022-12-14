/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}

export default function Notes({
  userInfo,
  viewMode,
  newId,
  setNewId,
  cards,
  setCards,
  isRead,
  setIsRead,
  isCreating,
  setIsCreating,
  readingCardId,
  setReadingCardId,
  isChange,
  setIsChange,
}) {
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

  useEffect(() => {
    if (isChange > 0) { storeNotes(); }
  }, [isChange]);

  function handleOnRead(cardId) {
    setIsRead(true);
    setReadingCardId(cardId);
  }

  function handleDelete(cardId) {
    setCards(cards.filter((c) => c.id !== cardId));
    setIsChange((n) => n + 1);
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
          setIsChange={setIsChange}
        />
      )}

      {userInfo ? userInfo.email : '請登入噢～'}

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

      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          className={viewMode === 'GridView' && 'cardContainer'}
        >
          {userInfo ? cardList : '這裡沒有汁料'}
        </div>
      </div>

      {/* <button onClick={storeNotes}>儲存</button> */}

    </Container>
  );
}
