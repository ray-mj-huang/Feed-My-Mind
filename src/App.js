/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  doc, onSnapshot, updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from './firebase';
import './App.css';
import Card from './Card';
import ReadingMode from './ReadingMode';
import SignUpCard from './SignUpCard';
import LoginCard from './LoginCard';

function Container({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        background: '#cccccc',
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [nextId, setNextId] = useState(1);
  const [cards, setCards] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const [readingCardId, setReadingCardId] = useState(0);

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
        setCards([]);
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
    if (cards.length > 0) { setNextId(cards[0].id + 1); }
    if (cards.length === 0) { setNextId(1); }
  }, [cards]);

  function handleStoreItem() {
    localStorage.setItem('myData', JSON.stringify(cards));
  }

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
        />
      )}

      {userInfo ? userInfo.email : '請登入噢～'}
      <SignUpCard />
      <LoginCard />

      <button onClick={signOutFunction}>登出</button>

      <button onClick={storeNotes}>把筆記寫入 FireStore</button>
      <hr />

      <h1>Feedy Notes</h1>

      <p>Welcome to Feedy Notes, hope you will enjoy it!</p>
      <div
        style={{ marginBottom: '30px' }}
      />
      <button
        onClick={handleStoreItem}
      >
        儲存到 localStorage
      </button>
      <button
        onClick={() => {
          const newData = JSON.parse(localStorage.getItem('myData'));
          setCards(newData);
        }}
      >
        從 localStorage 載入我的筆記
      </button>

      <hr />

      <p>{nextId}</p>

      <button
        onClick={() => {
          setCards([{
            id: nextId, isEdit: false, title: '標題', content: '內文',
          }, ...cards]);
          setNextId((id) => id + 1);
        }}
      >
        新增筆記
      </button>

      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
        }}
      >
        <div
          className="cardContainer"
        >
          {cardList}
        </div>
      </div>

    </Container>
  );
}

export default App;
