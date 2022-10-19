/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export default function SignUpCard() {
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
