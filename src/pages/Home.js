/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import SignUpCard from '../SignUpCard';
import LoginCard from '../LoginCard';

function Container({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(182.81deg, #757575 7.81%, #1B1B1B 92.91%)',
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <Container>
      <h1>Feed My Mind</h1>
      <h2>A Powerful Notes-Taking Tool</h2>
      <p>Welcome to Feedy Notes, hope you will enjoy it!</p>
      <SignUpCard />
      <LoginCard />
    </Container>
  );
}
