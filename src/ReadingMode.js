/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function ReadingMode({
  cardId, cards, setCards, setIsRead,
}) {
  const [readingId, setReadingId] = useState(cardId);

  const readingList = cards.filter((c) => c.id === readingId);
  const card = readingList[0];

  const [editingContent, setEditingContent] = useState(card.content);

  const currentIndex = cards.map((c) => c.id).indexOf(readingId);
  // console.log(`currentIndex: ${currentIndex}`);

  let previousId = '';
  let nextId = '';

  if (currentIndex > 0) {
    previousId = cards[currentIndex - 1].id;
    // console.log(`previousId: ${previousId}`);
  }

  if (currentIndex < cards.length - 1) {
    nextId = cards[currentIndex + 1].id;
  // console.log(`nextId: ${nextId}`);
  }

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < cards.length - 1;

  function handlePrevClick() {
    setReadingId(previousId);
    setCards(
      cards.map((c) => {
        if (c.id === readingId) {
          return { ...c, isEdit: false };
        }
        return c;
      }),
    );
  }

  function handleNextClick() {
    setReadingId(nextId);
    setCards(
      cards.map((c) => {
        if (c.id === readingId) {
          return { ...c, isEdit: false };
        }
        return c;
      }),
    );
  }

  const cardStyle = {
    width: '350px',
    height: '500px',
    padding: '20px',
    borderRadius: '6px',
    background: 'white',
  };

  const containerStyle = {
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
  };

  return (
    <div
      style={containerStyle}
    >
      <button
        onClick={() => {
          setIsRead(false);
          setCards(
            cards.map((c) => {
              if (c.id === readingId) {
                return { ...c, isEdit: false };
              }
              return c;
            }),
          );
        }}
      >
        跳出
      </button>

      <button
        onClick={() => {
          if (!card.isEdit) {
            setCards(
              cards.map((c) => {
                if (c.id === readingId) {
                  return { ...c, isEdit: !card.isEdit };
                }
                return c;
              }),
            );
          }

          if (card.isEdit) {
            setCards(
              cards.map((c) => {
                if (c.id === readingId) {
                  return { ...c, isEdit: !card.isEdit, content: editingContent };
                }
                return c;
              }),
            );
          }
        }}
      >
        { card.isEdit ? '儲存' : '點此編輯' }
      </button>

      <h4 style={{ color: 'white' }}>Read 模式</h4>

      <div
        style={cardStyle}
      >
        <h1>{`# ${card.id}`}</h1>
        <div
          contentEditable={card.isEdit}
          onInput={(e) => {
            setEditingContent(e.target.innerHTML);
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: card.content }}
        />
      </div>

      <button onClick={handlePrevClick} disabled={!hasPrev}>
        往左
      </button>

      <button onClick={handleNextClick} disabled={!hasNext}>
        往右
      </button>
    </div>
  );
}
