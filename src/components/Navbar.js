/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import styled from 'styled-components';

const Header = styled.header`
  background: #CDCDCD;
  box-shadow: 0px 4px 8px 2px rgb(0 0 0 / 0.2);
  color: #eeeeee;
  font-size: 18px;
  height: 60px;
  width: 100%;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;  
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NotesButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
`;

const HomeButton = styled.button`
  font-weight: 700;
  color: black;
  background: none;
  &:hover {background: none; color: #444444;}
`;

const DashboardButton = styled.button`
  font-weight: 700;
  color: black;
  background: none;
  &:hover {background: none; color: #444444;}
`;

const ShortCutButton = styled.button`
  height: 37px;
  width: 37px;
  padding: 0;
  background: #A8A8A8;
`;

const ShortCutToolbox = styled.div`
  width: 130px;
  display: flex;
  justify-content: space-between;
  margin-right: 150px;
`;

export default function Navbar({ changePage }) {
  return (
    <Header>
      <HomeButton
        style={{ fontWeight: 700 }}
        onClick={() => changePage('Home')}
      >
        ▲ Feed My Mind
      </HomeButton>

      <NotesButton onClick={() => changePage('Notes')}>
        Notes
      </NotesButton>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ShortCutToolbox>
          <ShortCutButton style={{ color: '#1DD79F' }}>▶</ShortCutButton>
          <ShortCutButton style={{ color: '#F4B510' }}>+</ShortCutButton>
          <ShortCutButton>☾</ShortCutButton>
        </ShortCutToolbox>
        <DashboardButton
          onClick={() => changePage('Dashboard')}
        >
          Dashboard
        </DashboardButton>
      </div>
    </Header>
  );
}
