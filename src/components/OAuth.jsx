import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from './../firebase.config';

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('http://localhost:4310/api/user/google', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      window.localStorage.setItem('userDetails', JSON.stringify(data));
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };

  return (
    <>
      <div
        onClick={handleGoogleClick}
        className='cursor-pointer border-2 flex justify-around p-2 items-center'
      >
        <img
          className='bg-white'
          src='../google-icon.png'
          alt='google-icon'
          width={30}
        />
        <div className='font-semibold'>Sign In with Google</div>
      </div>
    </>
  );
};

export default GoogleAuth;
