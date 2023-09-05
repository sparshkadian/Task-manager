import { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from './../assets/animations/animation.json';
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

  const handleSubmit = async (e) => {
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
    <div className='flex items-center h-screen'>
      <div className='relative py-10 signUp_container grid grid-cols-1 w-[95%] sm:w-4/5 mx-auto lg:grid-cols-2'>
        <div
          className='self-center
        w-5/6 sm:w-2/3 lg:w-5/6 justify-self-center grid-auto'
        >
          <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-5 '>
            <div className=''>
              <p className='text-base sm:text-lg md:text-xl font-bold'>
                Welcome Back to Taskmanager
              </p>
              <p className='text-sm sm:text-base md:text-lg '>
                Don't Have an Account,{' '}
                <Link to='/user/sign-up' className='text-blue-500 font-bold'>
                  Sign Up
                </Link>
              </p>
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                className='font-semibold text-lg shadow-2xl border-2 border-blue-200 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-4 focus:border-blue-500'
                id='email'
                type='email'
                autoComplete='off'
                value={email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                className='font-semibold text-lg shadow-2xl border-2 border-blue-200 appearance-none   w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-4 focus:border-blue-500'
                id='password'
                type='password'
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className='justify-self-end mr-1'>
              <p
                onClick={handlePasswordReset}
                className='text-blue-500 font-bold cursor-pointer'
              >
                Forgot Password ?
              </p>
            </div>

            <button
              className=' signUp__button w-1/2 justify-self-center sm:text-sm md:text-base mt-5 shadow-md bg-white hover:bg-blue-500 focus:shadow-outline focus:focus:border-blue-500/70  font-bold py-2 px-4 hover:text-white border-4 border-blue-200 sm:w-[40]'
              type='submit'
            >
              Sign In
            </button>

            <OAuth />
          </form>
        </div>
        <div className='hidden lg:block signUp__img lg:self-center'>
          <Lottie animationData={animation} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
