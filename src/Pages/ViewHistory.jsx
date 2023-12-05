import TwoDayOld from '../TasksHistory/TwoDayOld';
import OneDayOld from '../TasksHistory/OneDayOld';

const ViewHistory = () => {
  return (
    <div className='mt-5 max-w-7xl m-auto'>
      <h1 className='text-center text-5xl tracking-tight'>Tasks History</h1>

      <div className='mt-10 flex flex-col gap-20 sm:flex md:flex-row sm:gap-2 justify-around'>
        <TwoDayOld />
        <OneDayOld />
      </div>
    </div>
  );
};

export default ViewHistory;
