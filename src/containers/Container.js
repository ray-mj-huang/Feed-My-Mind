import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: #1e1e1e;
  padding-top: 75px;
  @media screen and (max-width: 900px) {
    padding-top: 60px;
  }
`;

export default Container;
