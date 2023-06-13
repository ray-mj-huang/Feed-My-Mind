import styled from 'styled-components';

export const ListViewCardBox = styled.div`
  width: 900px;
  height: 50px;
  padding: 0 10px;
  margin: 20px auto;
  border-radius: 10px;
  background: #171717;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background: #111111;
    box-shadow: 1px 1px 15px 4px rgb(54 54 50 / 25%);
  }
  @media screen and (max-width: 900px ) {
    width: 95%;
    margin: 10px auto;
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

export const CardReadButton = styled.button`
  color: #cccccc;
  font-size: 14px;
  height: 28px;
  padding: 0 14px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const ListViewInfoBox = styled.div`
  display: flex;
  align-items: center;
  width: 88%;
`;

export const ListViewToolBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20%;
  border-left: 1.5px solid #1e1e1e;
  height: 70%;
  padding-left: 26px;
  @media screen and (max-width: 900px) {
    width: 12%;
    padding-left: 3%;
  }
`;

export const ListTitleBox = styled.div`
  margin: 0px 10px 0 5px;
  font-size: 16px;
  letter-spacing: 1.2px;
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  @media screen and (max-width: 900px) {
    width: 155px;
  }
`;

export const ListTimeBox = styled.div`
  color: #666666;
  @media screen and (max-width: 900px) {
    width: 150px;
    font-size: 12px;
  }
`;
