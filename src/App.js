/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import './App.css';
import { useState } from 'react';
import Card from './Card';
// import cardList from './cardList';

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

function ReadingMode({ cardList, setIsRead }) {
  // 組出一個新 Array
  // 把新 Array 倒進 ReadingMode 這個元件裡

  const [index, setIndex] = useState(0);

  const hasPrev = index > 0;
  const hasNext = index < cardList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function randomizeArray(arr) {
    arr.sort(() => Math.random() - 0.5);
  }

  function jsonDeepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  const newArr = jsonDeepClone(cardList);

  randomizeArray(newArr);

  const [randomArr] = useState(newArr);

  const card = randomArr[index];

  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: 'rgba(34, 58, 128, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <button
        onClick={() => setIsRead(false)}
      >
        跳出
      </button>
      <h4 style={{ color: 'white' }}>閱讀模式</h4>
      <div
        style={{
          width: '350px',
          height: '500px',
          padding: '20px',
          borderRadius: '6px',
          background: 'white',
        }}
      >
        <h1>{`# ${card.id}`}</h1>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: card.content }}
        />
      </div>
      <button onClick={handlePrevClick} disabled={!hasPrev}>
        Previous
      </button>
      <button onClick={handleNextClick} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
}

function App() {
  const [cards, setCards] = useState([]);

  const [isGrab, setIsGrab] = useState(false);

  const [isRead, setIsRead] = useState(false);

  function onChange(cardId, newCardContent) {
    setCards(
      cards.map((c) => {
        if (c.id === cardId) {
          return { ...c, content: newCardContent };
        }
        return c;
      }),
    );
  }

  function setIsEdit(cardId, toggleEdit) {
    setCards(
      cards.map((c) => {
        if (c.id === cardId) {
          return { ...c, isEdit: toggleEdit };
        }
        return c;
      }),
    );
  }

  function handleStoreItem() {
    localStorage.setItem('myData', JSON.stringify(cards));
  }

  const cardList = cards.map((c) => (
    <Card
      key={c.id}
      card={c}
      value={c.content}
      isEdit={c.isEdit}
      setIsEdit={() => {
        setIsEdit(
          c.id,
          !c.isEdit,
        );
      }}
      onChange={(e) => {
        onChange(
          c.id,
          e.target.innerHTML,
        );
      }}
      isGrab={isGrab}
      setIsGrab={setIsGrab}
      cards={cards}
    />
  ));

  return (
    <Container>
      {isRead && <ReadingMode cardList={cards} setIsRead={setIsRead} />}

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
          setIsGrab(true);
        }}
      >
        載入我的筆記
      </button>
      <hr />

      <button
        onClick={() => {
          setCards([{
            id: cards.length + 1, isEdit: true, title: '標題', content: '內文',
          }, ...cards]);
        }}
      >
        新增筆記
      </button>
      <button
        onClick={() => setIsRead(true)}
      >
        播放筆記
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
