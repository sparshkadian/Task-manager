import { useState } from 'react';
import toast from 'react-hot-toast';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({ file: '', name: '' });
  const { file, name } = formData;

  const { _id: userId } = JSON.parse(
    window.localStorage.getItem('userDetails')
  );

  const handleChange = (e) => {
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

  const handlePhotoUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('photo', formData.file);
      form.append('name', formData.name);
      const res = await fetch(
        `https://taskmanager-api-aaxw.onrender.com/api/user/updateMe/${userId}`,
        {
          method: 'PATCH',
          body: form,
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
              onChange={handleChange}
              value={name}
              id='name'
              className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
          </div>

          <div>
            <button
              type='submit'
              className='hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
