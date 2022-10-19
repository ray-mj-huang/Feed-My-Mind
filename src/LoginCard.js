/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginCard() {
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
