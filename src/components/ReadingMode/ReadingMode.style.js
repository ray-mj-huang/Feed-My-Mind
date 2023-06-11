import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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

export const ReadingCard = styled.div`
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

export const ArrowButton = styled.button`
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

export const TimeBox = styled.div`
  color: #444444;
  font-size: 12px;
`;

export const AriticleContainer = styled.div`
  padding: 20px 10px;
  height: 350px;
  overflow: scroll;
  @media screen and (max-width: 900px) {
    height: 72%;
  }
`;

export const ChangeNoteBox = styled.div`
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

export const EditStyle = styled.div`
  ${(props) => (props.isEdit
    ? `
        background: black;
        padding: 5px 10px;
        margin: 10px 0 10px;
      ` : `
        background: initail;
        padding: initail;
        margin: initail;
      `)
}
`;
