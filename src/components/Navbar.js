/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import {
  MdOutlineDarkMode, MdAdd, MdPlayArrow, MdOutlineGridView, MdList,
} from 'react-icons/md';
import { GoSignOut } from 'react-icons/go';

const Header = styled.header`
  background: #000000;
  border-radius: 100px;
  color: #eeeeee;
  height: 60px;
  width: 900px;
  padding: 0 25px;
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 900px) {
    width: 100%;
    top: 0;
    border-radius: unset;
    padding: 0 10px;
  }
`;

const ToolButtonBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  @media screen and (max-width: 900px) {
    top: 70px;
    background: black;
    padding: 6px 30px;
    border-radius: 30px;
  }
`;

const Button = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const ToolButton = styled.button`
  width: 115px;
  height: 35px;
  border-radius: 20px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  }
`;

const DisplayModeButton = styled.button`
  width: 35px;
  height: 35px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const LogOutButton = styled.button`
//   height: 35px;
//   padding: 0 16px;
//   border-radius: 20px;
//   font-size: 14px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   color: #cccccc;
// `;

export default function Navbar({
  signOut,
  userInfo,
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
              signOut();
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
