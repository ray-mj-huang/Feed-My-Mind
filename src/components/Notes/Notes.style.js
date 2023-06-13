import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const WelcomeUserCard = styled.div`
  width: 320px;
  height: 120px;
  margin-top: 20px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;
  color: #aaaaaa;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

export const AddNoteCard = styled.div`
  width: 320px;
  height: 120px;
  border-radius: 10px;
  background: rgb(0,0,0);
  background: linear-gradient(337deg, rgba(0,0,0,1) 19%, rgba(23,23,23,1) 100%);
  margin: 20px 0;
  padding: 15px 0 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(337deg, rgba(34,34,34,1) 19%, rgba(51,51,51,1) 100%);
  }
  @media screen and (max-width: 900px) {
    margin: 20px 0 0 0;
  }
`;
