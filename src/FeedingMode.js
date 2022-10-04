/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function FeedingMode({ cardList, setIsFeed }) {
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
        onClick={() => setIsFeed(false)}
      >
        跳出
      </button>
      <h4 style={{ color: 'white' }}>Feed 模式</h4>
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
