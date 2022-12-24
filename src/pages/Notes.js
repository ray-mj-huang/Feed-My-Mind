/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import {
  doc, onSnapshot, updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import '../App.css';
import Card from '../Card';
import ReadingMode from '../ReadingMode';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const WelcomeUserCard = styled.div`
  width: 320px;
  height: 120px;
  margin-top: 20px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;
  color: #aaaaaa;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const AddNoteCard = styled.div`
  width: 320px;
  height: 120px;
  border-radius: 10px;
  background: rgb(0,0,0);
  background: linear-gradient(337deg, rgba(0,0,0,1) 19%, rgba(23,23,23,1) 100%);
  margin: 20px 0;
  padding: 15px 0 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(337deg, rgba(34,34,34,1) 19%, rgba(51,51,51,1) 100%);
  }
  @media screen and (max-width: 900px) {
    margin: 20px 0 0 0;
  }
`;

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

      {userInfo ? (
        <WelcomeUserCard>
          <i>Hello!</i>
          <i>{userInfo.email}</i>
        </WelcomeUserCard>
      ) : 'Please login first'}

      <AddNoteCard
        onClick={() => {
          setCards([{
            id: newId, isEdit: true, title: 'Title', content: 'Type your content here...', createdTime: null, editedTime: null, color: '#6BD677',
          }, ...cards]);
          setNewId((id) => id + 1);
          handleOnRead(newId);
          setIsCreating(true);
        }}
      >
        <MdAdd size={35} color="#F4B510" />
        <div>Add Note</div>
      </AddNoteCard>

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
          className={viewMode === 'GridView' ? 'gridViewContainer' : 'listViewContainer'}
        >
          {userInfo ? cardList : '這裡沒有汁料'}
        </div>
      </div>

      {/* <button onClick={storeNotes}>儲存</button> */}

    </Container>
  );
}
