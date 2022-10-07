/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import './App.css';
import { useState } from 'react';
import Card from './Card';
import ReadingMode from './ReadingMode';

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
  const [cards, setCards] = useState([]);

  const [isRead, setIsRead] = useState(false);

  const [readingCardId, setReadingCardId] = useState(0);

  function handleStoreItem() {
    localStorage.setItem('myData', JSON.stringify(cards));
  }

  function handleOnRead(cardId) {
    setIsRead(true);
    setReadingCardId(cardId);
  }

  const cardList = cards.map((c) => (
    <Card
      key={c.id}
      card={c}
      onRead={() => {
        handleOnRead(c.id);
      }}
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

      <button
        onClick={() => {
          setCards([{
            id: cards.length + 1, isEdit: false, title: '標題', content: '內文',
          }, ...cards]);
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
