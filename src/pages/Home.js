/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import SignInCard from '../SignInCard';

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

export default function Home({ color, setColor, userInfo }) {
  const boxStyle = {
    width: '500px', border: '1px solid white', borderRadius: '5px', padding: '20px', color: 'white', textAlign: 'center', margin: '10px',
  };

  return (
    <Container>
      <div style={boxStyle}>
        <h1>Feed My Mind</h1>
        <h2>A Cool Note-Taking Tool</h2>
        <p>Welcome to Feedy Notes, hope you will enjoy it!</p>
        <div>feature</div>
        <div style={{ background: color }}>red</div>
        <button onClick={() => setColor('blue')}>設為藍色</button>
      </div>
      {userInfo ? (
        <div style={{ color: 'white' }}>{`哈囉，${userInfo.email} ！`}</div>
      ) : (
        <div style={boxStyle}>
          <SignInCard />
        </div>
      )}
    </Container>
  );
}
