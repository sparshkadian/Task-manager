import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      <div className='relative h-screen overflow-hidden'>
        <nav className='landing-page-buttons flex gap-5 justify-end p-5'>
          <Link to='/user/sign-up'>
            <button className='btn'>Sign Up</button>
          </Link>
          <Link to='/user/log-in'>
            <button className='btn'>Log In</button>
          </Link>
        </nav>

        <div className='text w-4/5  flex flex-col items-center'>
          <div>
            <p className='text-one text-[65px] sm:text-[120px] md:text-[120px] lg:text-[150px]'>
              Welcome To
            </p>
            <p className='text-two text-[45px] sm:text-[80px] md:text-[80px] lg:text-[110px]'>
              Task Manager
            </p>
            <p className='text-three text-[13px] sm:text-[20px] lg:text-[27px]'>
              Empowering Your Productivity, One Task at a Time
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
