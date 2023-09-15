import { getAuth, signOut, deleteUser } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Swal from 'sweetalert2';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const sideBarContainer = {
    hidden: { opacity: 0, translateX: -20 },
    show: {
      opacity: 1,
      translateX: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleSignOut = async () => {
    try {
      signOut(auth);
      toast.success('Signed out Successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Error Signing Out!');
    }
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your Account has been deleted.', 'success');
        deleteUser(user);
        navigate('/');
      }
    });
  };

  const openSideBar = () => {
    setIsOpen(true);
  };

  const closeSideBar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <FontAwesomeIcon
          onClick={openSideBar}
          className='side-bar-icon'
          icon={faBars}
        />
      )}

      {isOpen && (
        <motion.div
          className='side-bar relative z-10 border-2 h-screen w-[300px]'
          variants={sideBarContainer}
          initial='hidden'
          animate='show'
          exit={{
            transition: {
              duration: 0.5,
            },
          }}
        >
          <div className='grid p-2 gap-4'>
            <div className='justify-self-center'>
              <p className=' text-2xl'>Profile Details</p>
            </div>

            <div className='justify-self-center'>
              <img
                src={user.photoURL}
                alt='user-profile-photo'
                className='rounded-full'
              />
            </div>

            <div>
              <p className='text-base sm:text-lg'>
                UserName: {user.displayName}
              </p>
            </div>
            <div>
              <p className='text-base sm:text-lg'>Email: {user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              type='button'
              className='sidebar-button p-2 rounded-3xl w-2/3 m-auto  hover:bg-blue-300'
            >
              Sign Out
            </button>
            <button
              onClick={handleDeleteAccount}
              type='button'
              className='sidebar-button p-2 rounded-3xl w-2/3 m-auto  hover:bg-red-300'
            >
              Delete Account
            </button>
          </div>
          <FontAwesomeIcon
            onClick={closeSideBar}
            className='side-bar-icon absolute top-0 right-2'
            icon={faX}
          />
        </motion.div>
      )}
    </>
  );
};

export default SideBar;
