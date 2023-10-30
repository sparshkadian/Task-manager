import { useState } from 'react';
import toast from 'react-hot-toast';

const UpdateProfile = () => {
  const [file, setFile] = useState('');

  const { _id: userId } = JSON.parse(
    window.localStorage.getItem('userDetails')
  );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePhotoUpdate = async (e) => {
    e.preventDefault();
    try {
      if (file === '') throw new Error('No Image selected');
      const formData = new FormData();
      formData.append('photo', file);
      const res = await fetch(
        `http://localhost:4310/api/user/updateMe/${userId}`,
        {
          method: 'PATCH',
          body: formData,
        }
      );
      const data = await res.json();
      if (data.status === 'fail') throw new Error(data.message);
      window.localStorage.removeItem('userDetails');
      window.localStorage.setItem(
        'userDetails',
        JSON.stringify(data.data?.user)
      );
      window.location.reload();
      toast.success('Update successfull');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center p-12'>
      <div className='mx-auto w-full max-w-[550px] bg-white'>
        <form onSubmit={handlePhotoUpdate}>
          <div className='mb-5'>
            <label
              htmlFor='name'
              className='mb-3 block text-base font-medium text-[#07074D]'
            >
              Profile Photo
            </label>
            <input
              type='file'
              name='name'
              onChange={handleFileChange}
              id='name'
              placeholder='Full Name'
              className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
          </div>

          <div>
            <button
              type='submit'
              className='hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'
            >
              Update Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
