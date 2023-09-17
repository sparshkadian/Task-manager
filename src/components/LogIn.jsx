import { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import OAuth from './OAuth';

const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success('Sign In Successfull');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      toast.error('Failed to Sign In');
      console.log(error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      if (!email) {
        toast.warning('Please Enter an Email');
      } else {
        sendPasswordResetEmail(auth, email);
        toast.success('Password Reset Mail Sent');
      }
    } catch (error) {
      toast.error('Error Sending mail !');
      console.log(error);
    }
  };

  return (
    <div className='h-screen'>
      <form
        onSubmit={handleLogin}
        className='form-container w-4/5 md:w-[60%] lg:w-1/2 rounded-md flex flex-col gap-2 mt-10'
      >
        <label htmlFor='email'>Email: </label>
        <input
          className='border-2 rounded-md p-2 border-black'
          type='text'
          id='email'
          value={email}
          onChange={handleChange}
        />

        <label htmlFor='name'>Password: </label>
        <input
          className='border-2 rounded-md p-2 border-black'
          type='password'
          id='password'
          value={password}
          onChange={handleChange}
        />

        <div className='mt-2 flex flex-col gap-2 sm:flex-row sm:justify-between text-sm sm:text-base'>
          <p>
            Don't have an Account ?{' '}
            <span className='text-red-500'>
              <Link to='/user/sign-up'>Signup</Link>
            </span>
          </p>

          <p
            className='cursor-pointer text-red-500'
            onClick={handlePasswordReset}
          >
            Forgot Password?
          </p>
        </div>

        <button
          className='btn btn-form mt-4 w-[60%] sm:w-[200px] m-auto'
          type='submit'
        >
          Log In
        </button>

        <div className='form-divider relative border-2 mt-5'></div>

        <div className='mt-4 w-[75%] sm:w-[250px] m-auto'>
          <OAuth />
        </div>

        <p className='mt-2 hover:text-red-500'>
          <Link to='/'>&larr; Back Home</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
