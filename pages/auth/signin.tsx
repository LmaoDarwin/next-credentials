import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { FormEventHandler, MutableRefObject, useRef } from 'react';

interface Props {}

const SignIn: NextPage<Props> = () => {
  const userRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      username: userRef.current.value,
      password: passRef.current.value,
      callbackUrl: `${window.location.origin}/protected`,
      redirect: false,
    });
    if (res?.url) router.push(res.url);
  };

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Log In</h1>
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

