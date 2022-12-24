/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdOutlineEdit, MdClose, MdOutlineDarkMode } from 'react-icons/md';
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineTrash } from 'react-icons/hi';

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  // background: #333333ee;
  // background: #131313;
  background: #383838;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 900px) {
    justify-content: start;
    padding-top: 20px;
  } 
`;

const ReadingCard = styled.div`
  width: 350px;
  height: 500px;
  padding: 20px;
  border-radius: 6px;
  background: #171717;
  z-index: 1;
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 70%;
  }
`;

const CardButton = styled.button`
  color: #cccccc;
  font-size: 14px;
  height: 28px;
  padding: 0 14px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowButton = styled.button`
  color: #cccccc;
  font-size: 14px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeBox = styled.div`
  color: #444444;
  font-size: 12px;
`;

const AriticleContainer = styled.div`
  padding: 20px 10px;
  height: 350px;
  overflow: scroll;
  @media screen and (max-width: 900px) {
    height: 72%;
  }
`;

const ChangeNoteBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  width: 600px;
  justify-content: space-between;
  @media screen and (max-width: 900px) {
    top: unset;
    bottom: 0;
    width: 320px;
  }
`;

const editStyle = {
  background: 'black',
  padding: '5px 10px',
};

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

  useEffect(() => {
    setEditingColor(card.color);
    setEditingTitle(card.title);
    setEditingContent(card.content);
  }, [cards]);

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: 330,
          // position: 'absolute',
          // top: '60px',
          // left: '50%',
          // transform: 'translateX(-50%)',
          margin: '0 0 30px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#343434',
            padding: '0 25px',
            borderRadius: 30,
          }}
        >
          <CardButton style={{ marginRight: 15 }}>
            <MdOutlineDarkMode size={25} color="#888888" />
          </CardButton>
          <h4 style={{ color: 'white' }}>{card.isEdit ? 'Editing Mode' : 'Reading Mode'}</h4>
        </div>
        {isCreating ? (
          <CardButton
            onClick={() => {
              setIsRead(false);
              setIsCreating(false);
              setCards(cards.filter((c) => c.id !== cardId));
            }}
          >
            Quit
          </CardButton>
        ) : (
          <CardButton
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
            <MdClose size={20} />
          </CardButton>
        )}
      </div>

      <ReadingCard>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '0.5px solid #1e1e1e',
              paddingBottom: '10px',
            }}
          >
            <div>{`# ${card.id}`}</div>
            {isCreating ? (
              <CardButton
                onClick={() => {
                  const timeData = new Date();
                  const year = timeData.getFullYear();
                  const month = timeData.getMonth() + 1;
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
                Create
              </CardButton>
            ) : (
              <CardButton
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
                    const month = timeData.getMonth() + 1;
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
                { card.isEdit ? 'Save Changes' : (
                  <>
                    <MdOutlineEdit style={{ marginRight: '8px' }} />
                    Edit
                  </>
                )}
              </CardButton>
            ) }
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '0.5px solid #1e1e1e',
              padding: '10px 0',
            }}
          >
            <TimeBox>{card.createdTime}</TimeBox>
            <TimeBox>{card.editedTime}</TimeBox>
          </div>
        </div>
        <AriticleContainer>
          <div
            style={{
              display: 'flex',
              position: 'relative',
            }}
          >
            <div style={{ background: card.color, width: 65, height: 12 }} />
            {card.isEdit ? (
              <>
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '50%',
                    left: '50%',
                    color: '#aaaaaa',
                    transform: 'translate(-12%, -50%)',
                    fontSize: 12,
                    pointerEvents: 'none',
                  }}
                >
                  Change Color
                </div>
                <input
                  onChange={(e) => setEditingColor(e.target.value)}
                  type="color"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 225,
                    height: 12,
                  }}
                />
              </>
            ) : null}
          </div>
          <h1
            contentEditable={card.isEdit}
            onInput={(e) => {
              setEditingTitle(e.target.innerHTML);
            }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: card.title }}
            style={card.isEdit ? editStyle : null}
          />
          <div
            contentEditable={card.isEdit}
            onInput={(e) => {
              setEditingContent(e.target.innerHTML);
            }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: card.content }}
            style={card.isEdit ? editStyle : null}
          />
        </AriticleContainer>
        <div
          style={{
            padding: '13px 0',
            borderTop: '1.5px solid #1a1a1a',
          }}
        >
          {isCreating ? null : (
            <CardButton
              onClick={() => {
                setIsRead(false);
                setCards(cards.filter((c) => c.id !== cardId));
                setIsChange((n) => n + 1);
              }}
            >
              <HiOutlineTrash size={18} style={{ marginRight: '8px' }} />
              Delete
            </CardButton>
          )}
        </div>
      </ReadingCard>

      <ChangeNoteBox>
        {isCreating || (
          <>
            <ArrowButton onClick={() => handlePrevClick()} disabled={!hasPrev}>
              <HiOutlineArrowLeft size={27} />
            </ArrowButton>
            <ArrowButton onClick={() => handleNextClick()} disabled={!hasNext}>
              <HiOutlineArrowRight size={27} />
            </ArrowButton>
          </>
        )}
      </ChangeNoteBox>
    </Container>
  );
}
