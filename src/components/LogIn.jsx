import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import OAuth from './OAuth';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hideEye, setHideEye] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleEyeChange = () => {
    setShowPassword((prevValue) => {
      return !prevValue;
    });

    setHideEye((prevValue) => {
      return !prevValue;
    });
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4310/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.status === 'fail') {
        setLoading(false);
        throw new Error(data.message);
      }
      const user = data.data.user;
      toast.success('Logged In Successfully');
      window.localStorage.setItem('userDetails', JSON.stringify(user));
      setLoading(false);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='h-screen'>
      <form
        onSubmit={handleLogin}
        className='form-container w-4/5 md:w-[60%] lg:w-1/2 rounded-md flex flex-col gap-2 mt-10'
      >
        <label htmlFor='email' className='text-lg'>
          Email:{' '}
        </label>
        <input
          className='border-2 rounded-md p-2 border-black'
          type='text'
          id='email'
          value={email}
          onChange={handleInputChange}
        />

        <div className='relative flex flex-col gap-2'>
          <label htmlFor='name' className='text-lg'>
            Password:{' '}
          </label>
          <input
            className='border-2 rounded-md p-2 border-black'
            type={`${showPassword ? 'text' : 'password'}`}
            id='password'
            value={password}
            onChange={handleInputChange}
          />
          <img
            onClick={handleEyeChange}
            src={`${hideEye ? '../hide.png' : '../view.png'}`}
            width={25}
            alt='eye'
            className='cursor-pointer absolute right-[0.5rem] top-[2.9rem]'
          />
        </div>

        <div className='mt-2 flex flex-col gap-2 sm:flex-row sm:justify-between text-sm sm:text-base'>
          <p>
            Don't have an Account ?{' '}
            <span className='text-red-500'>
              <Link to='/user/sign-up'>Signup</Link>
            </span>
          </p>

          <p className='cursor-pointer text-red-500'>Forgot Password?</p>
        </div>

        <button
          className='btn btn-form mt-4 w-[60%] sm:w-[200px] m-auto'
          type='submit'
        >
          {loading ? <Spinner /> : 'Log In'}
        </button>

        <div className='relative border-2 mt-5'></div>

        <div className='mt-4 self-center'>
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
