/* eslint-disable react/button-has-type */
import { useState } from 'react';
import styled from 'styled-components';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

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

function SignUpBox() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const auth = getAuth();

  const newUser = {
    user_id: '',
    email: '',
    user_notes: [],
  };

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        const userData = auth.currentUser;
        // eslint-disable-next-line no-console
        console.log(user);
        const createNewUserData = doc(db, 'users', userData.uid);
        setDoc(createNewUserData, ({
          ...newUser,
          user_id: userData.uid,
          email: userData.email,
        }));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.log(`${errorCode}: ${errorMessage}`);
      });
  }

  return (
    <form>
      <input
        id="email"
        type="email"
        placeholder="email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        style={{
          margin: '5px 0',
          padding: 5,
          border: 'none',
          borderRadius: 5,
          height: 30,
          width: 250,
          background: 'black',
          color: 'white',
        }}
      />
      <input
        id="password"
        type="password"
        placeholder="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        style={{
          margin: '5px 0',
          padding: 5,
          border: 'none',
          borderRadius: 5,
          height: 30,
          width: 250,
          background: 'black',
          color: 'white',
        }}
      />
      <button
        style={{
          margin: '20px 0 80px 0',
          padding: 5,
          border: 'none',
          borderRadius: 5,
          height: 30,
          width: 250,
          fontSize: 16,
        }}
        onClick={(e) => {
          e.preventDefault();
          signUp(emailValue, passwordValue);
        }}
      >
        Sign Up
      </button>
    </form>
  );
}

function LoginBox() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function login(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        // eslint-disable-next-line no-console
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.log(`${errorCode}: ${errorMessage}`);
      });
  }

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input
        style={{
          margin: '5px 0',
          padding: 5,
          border: 'none',
          borderRadius: 5,
          height: 30,
          width: 250,
          background: 'black',
          color: 'white',
        }}
        id="email"
        type="email"
        placeholder="email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
      />
      <input
        style={{
          margin: '5px 0',
          padding: 5,
          border: 'none',
          borderRadius: 5,
          height: 30,
          width: 250,
          background: 'black',
          color: 'white',
        }}
        id="password"
        type="password"
        placeholder="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <button
        style={{
          margin: '20px 0 80px 0',
          padding: 5,
          border: 'none',
          borderRadius: 5,
          height: 30,
          width: 250,
          fontSize: 16,
        }}
        onClick={(e) => {
          e.preventDefault();
          login(emailValue, passwordValue);
        }}
      >
        Login
      </button>
    </form>
  );
}

export default function SignInCard() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src="logo_temp.png" alt="logo" width="20" style={{ marginRight: 10 }} />
        <h1>Feed My Mind</h1>
      </div>
      {isLogin ? (
        <>
          <LoginBox />
          <div>
            Do not have an account yet?
            <button
              onClick={() => setIsLogin(false)}
              style={{ padding: 5, borderRadius: 5, marginLeft: 8 }}
            >
              Sign up here
            </button>
          </div>
        </>
      ) : (
        <>
          <SignUpBox />
          <div>
            Back to
            <button
              onClick={() => setIsLogin(true)}
              style={{ padding: 5, borderRadius: 5, marginLeft: 8 }}
            >
              Login
            </button>
          </div>
        </>
      )}
    </Container>
  );
}
