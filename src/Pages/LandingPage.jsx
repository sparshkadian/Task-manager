import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      <div className='relative h-screen overflow-hidden'>
        <nav className='flex gap-5 justify-end p-5'>
          <button className='btn'>
            <Link to='/user/sign-up'>Sign Up</Link>
          </button>
          <button className='btn'>
            <Link to='/user/log-in'>Log In</Link>
          </button>
        </nav>

        <div className='text w-4/5  flex flex-col items-center'>
          <div>
            <p className='text-one text-[65px] sm:text-[100px] md:text-[120px] lg:text-[150px]'>
              Welcome To
            </p>
            <p className='text-two text-[45px] sm:text-[70px] md:text-[80px] lg:text-[110px]'>
              Task Manager
            </p>
            <p className='text-three text-[13px] sm:text-[18px] lg:text-[27px]'>
              Empowering Your Productivity, One Task at a Time
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
