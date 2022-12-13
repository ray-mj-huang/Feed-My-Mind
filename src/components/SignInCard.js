/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

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
      <div><b>註冊：</b></div>
      <input id="email" type="email" placeholder="輸入帳號" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
      <input id="password" type="password" placeholder="輸入密碼" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
      <button
        onClick={(e) => {
          e.preventDefault();
          signUp(emailValue, passwordValue);
        }}
      >
        ENTER
      </button>
      <hr />
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
    <form>
      <div><b>登入：</b></div>
      <input id="email" type="email" placeholder="輸入帳號" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
      <input id="password" type="password" placeholder="輸入密碼" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
      <button
        onClick={(e) => {
          e.preventDefault();
          login(emailValue, passwordValue);
        }}
      >
        ENTER
      </button>
      <hr />
    </form>
  );
}

export default function SignInCard() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <>
          <LoginBox />
          尚未有帳號？點此進行註冊：
          <button onClick={() => setIsLogin(false)}>來去註冊</button>
        </>
      ) : (
        <>
          <SignUpBox />
          返回登入：
          <button onClick={() => setIsLogin(true)}>點此返回</button>
        </>
      )}
    </div>
  );
}
