import styled from 'styled-components';

export const GridViewCardBox = styled.div`
  width: 320px;
  height: 320px;
  padding: 20px 20px 12px 20px;
  margin: 10px 20px 30px 0;
  border-radius: 10px;
  background: #171717;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background: #111111;
    box-shadow: 1px 1px 15px 4px rgb(54 54 50 / 25%);
  }
  @media screen and (max-width: 900px ) {
    
  }
`;

export const CardButton = styled.button`
  color: #cccccc;
  font-size: 14px;
  height: 28px;
  padding: 0 14px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TimeBox = styled.div`
  color: #444444;
  font-size: 12px;
`;
