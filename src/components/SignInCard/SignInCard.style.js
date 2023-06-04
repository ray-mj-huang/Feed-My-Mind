import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
  height: 420px;
  border-radius: 10px;
  padding: 20px;
  color: white;
  text-align: center;
  margin: 80px 0 0 0;
  background: #111111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 900px) {
    width: 350px;
    height: 375px;
    margin-top: 25%;
  }
`;

export default Container;
