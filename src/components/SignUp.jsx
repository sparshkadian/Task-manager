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
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const handleEyeChange = () => {
    setShowPassword((prevValue) => {
      return !prevValue;
    });

    setHideEye((prevValue) => {
      return !prevValue;
    });
  };

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4310/api/auth/signup', {
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
      toast.success('Account Created Successfully');
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
    <>
      <div className='h-screen'>
        <form
          onSubmit={handleSignUp}
          className='form-container w-4/5 md:w-[60%] lg:w-1/2 rounded-md flex flex-col gap-2 mt-10'
        >
          <label htmlFor='name' className='text-lg'>
            Name:
          </label>
          <input
            className='border-2 rounded-md p-2 border-black'
            type='text'
            id='name'
            value={name}
            onChange={handleInputChange}
          />

          <label htmlFor='email' className='text-lg'>
            Email:
          </label>
          <input
            className='border-2 rounded-md p-2 border-black'
            type='email'
            id='email'
            value={email}
            onChange={handleInputChange}
          />

          <div className='relative flex flex-col gap-2'>
            <label htmlFor='name' className='text-lg'>
              Password:
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

          <p>
            Have an Account ?{' '}
            <span className='text-red-500'>
              <Link to='/user/log-in'>Login</Link>
            </span>
          </p>

          <button
            className='btn btn-form mt-3  w-[60%] sm:w-[200px] m-auto'
            type='submit'
          >
            {loading ? <Spinner /> : 'Sign Up'}
          </button>

          <div className='form-divider relative border-2 mt-5'></div>

          <div className='mt-4 self-center'>
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
