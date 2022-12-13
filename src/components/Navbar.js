/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import styled from 'styled-components';
import {
  MdOutlineDarkMode, MdAdd, MdPlayArrow, MdOutlineGridView, MdList,
} from 'react-icons/md';

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

const DisplayModeButton = styled.button`
  width: 35px;
  height: 35px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogOutButton = styled.button`
  // width: 30px;
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  font-size: 14px;
`;

export default function Navbar({ signOut, userInfo, setViewMode }) {
  return (
    <Header>
      <div
        style={{
          fontWeight: 700,
          fontSize: 16,
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

      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
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
          <MdAdd size={25} color="#F4B510" />
        </Button>
        <Button>
          <MdPlayArrow size={25} color="#1DD79F" />
        </Button>
      </div>

      {userInfo ? <LogOutButton onClick={signOut}>Log Out</LogOutButton> : null}
    </Header>
  );
}
