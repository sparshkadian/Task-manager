import { useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

const ChangePassword = () => {
  const { _id: userId } = JSON.parse(
    window.localStorage.getItem('userDetails')
  );
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [hideEye, setHideEye] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentPassword, newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleEyeChange = () => {
    setShowPassword((prevValue) => {
      return !prevValue;
    });

    setHideEye((prevValue) => {
      return !prevValue;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4310/api/user/resetpassword/${userId}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.status === 204) {
        toast.success('Password Changed Successfully');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setLoading(false);
      } else {
        const data = await res.json();
        if (data.status === 'fail') {
          setLoading(false);
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='pt-20'>
      <form
        onSubmit={handleSubmit}
        className='z-[10] border-2 border-black max-w-[400px] sm:max-w-lg m-auto flex flex-col gap-4 p-5 rounded-md'
      >
        <h1 className='z-[10] text-3xl font-semibold text-center'>
          Reset password
        </h1>

        <div className='z-[10] mt-7 flex flex-col gap-2'>
          <label htmlFor='currentPassword' className='text-lg'>
            Current Password
          </label>
          <input
            type='text'
            name='currentPassword'
            id='currentPassword'
            value={currentPassword}
            onChange={handleChange}
            className='border-2 p-2 rounded-lg hover:shadow focus:outline-none focus:border-slate-500'
          />
        </div>

        <div className='z-[10] flex flex-col gap-2'>
          <label htmlFor='newPassword' className='text-lg'>
            New Password
          </label>
          <input
            type='password'
            name='newPassword'
            id='newPassword'
            value={newPassword}
            onChange={handleChange}
            className='border-2 p-2 rounded-lg hover:shadow focus:outline-none focus:border-slate-500'
          />
        </div>

        <div className='flex flex-col gap-2 relative'>
          <label htmlFor='confirmPassword' className='text-lg'>
            Confirm Password
          </label>
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            name='confirmPassword'
            id='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            className='border-2 p-2 rounded-lg hover:shadow focus:outline-none focus:border-slate-500'
          />
          <img
            src={`${hideEye ? './hide.png' : './view.png'}`}
            alt='eye'
            width={25}
            onClick={handleEyeChange}
            className='cursor-pointer absolute right-[0.5rem] top-[2.8rem]'
          />
        </div>

        <button
          type='submit'
          className='z-[10] flex justify-center text-white bg-black p-2 rounded-md mt-4'
        >
          {loading ? <Spinner /> : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
