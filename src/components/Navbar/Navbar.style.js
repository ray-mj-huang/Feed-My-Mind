import styled from 'styled-components';

export const Header = styled.header`
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

export const ToolButtonBox = styled.div`
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

export const Button = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

export const ToolButton = styled.button`
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

export const DisplayModeButton = styled.button`
  width: 35px;
  height: 35px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
