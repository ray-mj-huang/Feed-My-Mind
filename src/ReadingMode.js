/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function ReadingMode({
  cardId, cards, setCards, setIsRead, isCreating, setIsCreating, setIsChange,
}) {
  // 以 card ID 決定要顯示哪一張卡片
  const [readingId, setReadingId] = useState(cardId);

  // 以 card ID 過濾出該張卡片
  const readingList = cards.filter((c) => c.id === readingId);
  const card = readingList[0];

  // 編輯卡片的設定
  const [editingContent, setEditingContent] = useState(card.content);
  const [editingTitle, setEditingTitle] = useState(card.title);
  const [editingColor, setEditingColor] = useState(card.color);

  // 找出當前卡片在陣列中的 index 值
  const currentIndex = cards.map((c) => c.id).indexOf(readingId);

  // 以下是前後移動到其他卡片的功能
  let previousId = '';
  let nextId = '';

  if (currentIndex > 0) {
    previousId = cards[currentIndex - 1].id;
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
          setCards(cards.filter((c) => c.id !== cardId));
          setIsChange((n) => n + 1);
        }}
      >
        delete
      </button>

      {isCreating ? (
        <button
          onClick={() => {
            setIsRead(false);
            setIsCreating(false);
            setCards(cards.filter((c) => c.id !== cardId));
          }}
        >
          放棄建立
        </button>
      ) : (
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
      )}

      {isCreating ? (
        <button
          onClick={() => {
            const timeData = new Date();
            const year = timeData.getFullYear();
            const month = timeData.getMonth();
            const date = timeData.getDate();
            const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(timeData);
            const hour = timeData.getHours();
            const minutes = (timeData.getMinutes() < 10 ? '0' : '') + timeData.getMinutes();
            const createdTimeValue = `${year}-${month}-${date} ${day} ${hour}:${minutes}`;
            setCards(
              cards.map((c) => {
                if (c.id === readingId) {
                  return {
                    ...c,
                    isEdit: !card.isEdit,
                    title: editingTitle,
                    content: editingContent,
                    createdTime: createdTimeValue,
                    color: editingColor,
                  };
                }
                return c;
              }),
            );
            setIsCreating(false);
            setIsChange((n) => n + 1);
          }}
        >
          建立
        </button>
      ) : (
        <button
          onClick={() => {
            // 開啟編輯
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
            // 儲存
            if (card.isEdit) {
              const timeData = new Date();
              const year = timeData.getFullYear();
              const month = timeData.getMonth();
              const date = timeData.getDate();
              const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(timeData);
              const hour = timeData.getHours();
              const minutes = (timeData.getMinutes() < 10 ? '0' : '') + timeData.getMinutes();
              const editedTimeValue = `${year}-${month}-${date} ${day} ${hour}:${minutes}`;
              setCards(
                cards.map((c) => {
                  if (c.id === readingId) {
                    return {
                      ...c,
                      isEdit: !card.isEdit,
                      title: editingTitle,
                      content: editingContent,
                      editedTime: editedTimeValue,
                      color: editingColor,
                    };
                  }
                  return c;
                }),
              );
              setIsChange((n) => n + 1);
            }
          }}
        >
          { card.isEdit ? '儲存' : '點此編輯' }
        </button>
      ) }

      <h4 style={{ color: 'white' }}>{card.isEdit ? 'Edit 模式' : 'Read 模式'}</h4>

      <div
        style={cardStyle}
      >
        <div style={{ background: card.color, width: 15, height: 15 }} />
        {card.isEdit ? (
          <input
            onChange={(e) => setEditingColor(e.target.value)}
            type="color"
          />
        )
          : null}
        <h2>{`# ${card.id}`}</h2>
        <h1
          contentEditable={card.isEdit}
          onInput={(e) => {
            setEditingTitle(e.target.innerHTML);
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: card.title }}
        />
        <div
          contentEditable={card.isEdit}
          onInput={(e) => {
            setEditingContent(e.target.innerHTML);
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: card.content }}
        />
      </div>

      {isCreating || (
        <>
          <button onClick={handlePrevClick} disabled={!hasPrev}>
            往左
          </button>
          <button onClick={handleNextClick} disabled={!hasNext}>
            往右
          </button>
        </>
      )}

    </div>
  );
}
