import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from './../firebase.config';
import AsyncCalls from '../AsyncCalls';

const GoogleAuth = () => {
  const { googleAuth } = AsyncCalls();

  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        isGoogleAuth: true,
      };

      googleAuth(userData);
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };

  return (
    <>
      <div
        onClick={handleGoogleClick}
        className='cursor-pointer border-2 border-black rounded-md  flex justify-between p-2 items-center w-[200px]'
      >
        <img
          className='rounded-full'
          src='../google-icon.png'
          alt='google-icon'
          width={25}
        />
        <div className='font-semibold'>Sign In with Google</div>
      </div>
    </>
  );
};

export default GoogleAuth;
