import { useState } from 'react';
import { Link } from 'react-router-dom';
import AsyncCalls from '../AsyncCalls';

const UpdateProfile = () => {
  const { updateProfile } = AsyncCalls();
  const [formData, setFormData] = useState({ file: '', name: '' });

  const { _id: userId, isGoogleAuth: google } = JSON.parse(
    window.localStorage.getItem('userDetails')
  );

  const handleNameChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      file: e.target.files[0],
    }));
  };

  const handleProfileUpdate = async (e) => {
    updateProfile(e, formData, userId);
  };

  return (
    <div className='flex items-center justify-center p-12'>
      <div className='z-[10] mx-auto w-full max-w-[550px]'>
        <form onSubmit={handleProfileUpdate}>
          <div className='mb-5'>
            <label
              htmlFor='file'
              className='mb-3 block text-base font-medium text-[#07074D]'
            >
              Profile Photo
            </label>
            <input
              type='file'
              name='file'
              onChange={handleFileChange}
              id='file'
              placeholder='Full Name'
              className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
          </div>

          <div className='mb-5'>
            <label
              htmlFor='name'
              className='mb-3 block text-base font-medium text-[#07074D]'
            >
              User Name
            </label>
            <input
              type='text'
              name='name'
              onChange={handleNameChange}
              value={formData.name}
              id='name'
              className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
          </div>

          <div className='flex justify-between'>
            <button
              type='submit'
              className='hover:shadow-form rounded-md bg-black hover:bg-slate-700 py-3 px-8 text-center text-base font-semibold text-white outline-none'
            >
              Save Changes
            </button>

            {!google && (
              <Link to='/changepassword'>
                <button
                  type='submit'
                  className='hover:shadow-form rounded-md bg-black hover:bg-slate-700 py-3 px-8 text-center text-base font-semibold text-white outline-none'
                >
                  Change Password
                </button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
