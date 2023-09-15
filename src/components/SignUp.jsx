import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { app } from '../firebase.config';
import { toast } from 'react-toastify';
import OAuth from './OAuth';

const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      toast.success('Account Created Successfully');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error('SignUp Failed! Try Again.');
    }
  };

  return (
    <>
      <div className='h-screen'>
        <form
          onSubmit={handleSignUp}
          className='form-container w-4/5 md:w-[60%] lg:w-1/2 rounded-md flex flex-col gap-2 mt-10'
        >
          <label htmlFor='name'>Name: </label>
          <input
            className='border-2 rounded-md p-2 border-black'
            type='text'
            id='name'
            value={name}
            onChange={handleChange}
          />

          <label htmlFor='email'>Email: </label>
          <input
            className='border-2 rounded-md p-2 border-black'
            type='text'
            id='email'
            value={email}
            onChange={handleChange}
          />

          <label htmlFor='password'>Password: </label>
          <input
            className='border-2 rounded-md p-2 border-black'
            type='text'
            id='password'
            value={password}
            onChange={handleChange}
          />

          <p>
            Have an Account ?{' '}
            <span className='text-red-500'>
              <Link to='/user/log-in'>Login</Link>
            </span>
          </p>

          <button className='btn-Form mt-3 w-1/3 m-auto' type='submit'>
            Sign Up
          </button>

          <div className='form-divider relative border-2 mt-5'></div>

          <div className='mt-4 w-[65%] sm:w-[250px] m-auto'>
            <OAuth />
          </div>

          <p className='mt-2 hover:text-red-500'>
            <Link to='/'>&larr; Back Home</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
