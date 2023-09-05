import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { app } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from './../assets/animations/animation.json';
import OAuth from './OAuth';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials);
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      toast.success('Account created Successfully');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      toast.error('Failed to Create Account');
      console.log(error);
    }
  };

  return (
    <div className='flex h-screen items-center'>
      <div className='signUp_container py-10 grid grid-cols-1 w-[95%] sm:w-4/5 mx-auto lg:grid-cols-2 '>
        <div className='self-center w-5/6 sm:w-2/3 lg:w-5/6 justify-self-center grid-auto'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-5 '>
            <div className=''>
              <p className='text-lg sm:text-lg md:text-xl lg:text-2xl font-bold'>
                Welcome to Taskmanager
              </p>
              <p>
                Creat an account or{' '}
                <Link to='/user/log-in' className='text-blue-500 font-bold'>
                  Log In
                </Link>
              </p>
            </div>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                className='font-semibold text-lg shadow-2xl border-2 border-blue-200 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-4 focus:border-blue-500'
                id='name'
                type='text'
                autoComplete='off'
                value={name}
                onChange={handleChange}
              />
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
                className='font-semibold text-lg shadow-2xl border-2 border-blue-200 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-4 focus:border-blue-500'
                id='password'
                type='password'
                value={password}
                onChange={handleChange}
              />
            </div>

            <button
              className=' signUp__button w-1/2  justify-self-center sm:text-sm md:text-base mt-5 shadow-md bg-white hover:bg-blue-500 focus:shadow-outline focus:focus:border-blue-500/70  font-bold py-2 px-4 hover:text-white border-4 border-blue-200 sm:w-[40%]'
              type='submit'
            >
              Sign Up
            </button>
          </form>

          <OAuth />
        </div>
        <div className='hidden lg:block signUp__img self-center'>
          <Lottie animationData={animation} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
