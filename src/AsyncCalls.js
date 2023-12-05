import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import TaskContext from './context/TaskContext';

const AsyncCalls = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(TaskContext);

  const signUp = async (e, formData) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
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

  const login = async (e, formData) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
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

  const googleAuth = async (userData) => {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    window.localStorage.setItem('userDetails', JSON.stringify(data));
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  const updateProfile = async (e, formData, userId) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('photo', formData.file);
      form.append('name', formData.name);
      const res = await fetch(
        `http://localhost:4310/api/user/updateMe/${userId}`,
        {
          method: 'PATCH',
          body: form,
        }
      );
      console.log(res);
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

  return { signUp, login, googleAuth, updateProfile };
};

export default AsyncCalls;
