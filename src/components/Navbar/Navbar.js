/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  MdOutlineDarkMode, MdAdd, MdPlayArrow, MdOutlineGridView, MdList,
} from 'react-icons/md';
import { GoSignOut } from 'react-icons/go';
import { useUserInfo } from '../../context/UserInfoContext';
import {
  Header,
  ToolButtonBox,
  Button,
  ToolButton,
  DisplayModeButton,
} from './Navbar.style';

export default function Navbar({
  setViewMode,
  setCards,
  setNewId,
  setIsCreating,
  setIsRead,
  setReadingCardId,
  newId,
  cards,
}) {
  const [isOpenTool, setIsOpenTool] = useState(false);
  const { userInfo, handleSignOut } = useUserInfo();

  return (
    <Header>
      <div
        style={{
          fontWeight: 700,
          fontSize: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src="logo_temp.png" alt="logo" width="20" style={{ marginRight: 10 }} />
        <div>Feed My Mind</div>
        <Button style={{ marginLeft: 10 }}>
          <MdOutlineDarkMode size={25} color="#888888" />
        </Button>
      </div>

      {isOpenTool ? (
        <ToolButtonBox>
          <DisplayModeButton
            style={{ borderRadius: '5px 0 0 5px', marginLeft: 3 }}
            onClick={() => setViewMode('ListView')}
          >
            <MdList size={26} color="#888888" />
          </DisplayModeButton>
          <DisplayModeButton
            style={{ borderRadius: '0 5px 5px 0', marginRight: 8 }}
            onClick={() => setViewMode('GridView')}
          >
            <MdOutlineGridView size={23} color="#888888" />
          </DisplayModeButton>
          <Button>
            <MdAdd
              size={25}
              color="#F4B510"
              onClick={() => {
                setCards([{
                  id: newId, isEdit: true, title: 'Title', content: 'Type your content here...', createdTime: null, editedTime: null, color: '#6BD677',
                }, ...cards]);
                setNewId((id) => id + 1);
                setIsRead(true);
                setReadingCardId(newId);
                setIsCreating(true);
              }}
            />
          </Button>
          <Button style={{ display: 'none' }}>
            <MdPlayArrow size={25} color="#1DD79F" />
          </Button>
        </ToolButtonBox>
      ) : null}

      {userInfo ? (
        <div style={{ display: 'flex' }}>
          <ToolButton
            onClick={() => setIsOpenTool(!isOpenTool)}
          >
            {isOpenTool ? 'Close Tools' : 'Open Tools'}
          </ToolButton>
          <Button
            onClick={() => {
              handleSignOut();
              setIsOpenTool(false);
            }}
          >
            <GoSignOut size={20} style={{ margin: '3px 0px 0px 2px' }} />
          </Button>
        </div>
      ) : null}
    </Header>
  );
}
