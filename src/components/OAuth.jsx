import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
// import { ReactComponent as GoogleIcon } from './../assets/imgs/google.svg';

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      navigate('/home');
    } catch (error) {
      console.log(error);
      toast.error('Failed to Create Account');
    }
  };

  return (
    <>
      <button
        onClick={handleSignIn}
        type='button'
        class='login-with-google-btn w-1/2 justify-self-center'
      >
        Sign in with Google
      </button>
    </>
  );
};

export default OAuth;
