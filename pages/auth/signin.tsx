import { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/react';
import router from 'next/router';
import { FormEventHandler, MutableRefObject, useRef, useState } from 'react';

interface Props {}

const SignIn: NextPage<Props> = () => {
  const userRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [fail,setFail] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      username: userRef.current.value,
      password: passRef.current.value,
      callbackUrl: `${window.location.origin}/protected`,
      redirect: false,
    })
    if (res?.url) router.push(res.url);
    else if (!res?.ok) setFail(true)
    // console.log(res)
    // console.log(fail)
  };

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Log In</h1>
        {(fail)?<p>Login Fail</p>:null}
        <input type='text' placeholder='Username' ref={userRef} />
        <input type='password' placeholder='Password' ref={passRef} />
        <span>
          <button type='submit'>Login</button>
          <button type='button' onClick={() => signOut()}>
            Logout
          </button>
        </span>
      </form>
    </div>
  );
};

export default SignIn;

