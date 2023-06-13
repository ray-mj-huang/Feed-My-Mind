/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import { useState } from 'react';
import './App.css';
import { useUserInfo } from './context/UserInfoContext';
import Container from './containers/Container';
import Notes from './components/Notes';
import Navbar from './components/Navbar';
import SignInCard from './components/SignInCard';

function App() {
  const { userInfo } = useUserInfo();

  const [viewMode, setViewMode] = useState('GridView');
  const [newId, setNewId] = useState(1);
  const [cards, setCards] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [readingCardId, setReadingCardId] = useState(0);
  const [isChange, setIsChange] = useState(0);

  return (
    <Container>
      <Navbar
        setViewMode={setViewMode}
        setCards={setCards}
        setNewId={setNewId}
        setIsCreating={setIsCreating}
        setIsRead={setIsRead}
        setReadingCardId={setReadingCardId}
        newId={newId}
        cards={cards}
      />
      {userInfo ? (
        <Notes
          viewMode={viewMode}
          newId={newId}
          setNewId={setNewId}
          cards={cards}
          setCards={setCards}
          isRead={isRead}
          setIsRead={setIsRead}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          readingCardId={readingCardId}
          setReadingCardId={setReadingCardId}
          isChange={isChange}
          setIsChange={setIsChange}
        />
      ) : (<SignInCard />)}
    </Container>
  );
}

export default App;
