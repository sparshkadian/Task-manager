import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';

const TwoDayOld = () => {
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const dateString = `${date - 2}-${month + 1}-${year}`;

  const userDetails = JSON.parse(window.localStorage.getItem('userDetails'));

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/tasks/twoDaysOld/${userDetails._id}`);
      const data = await res.json();
      setCompleted(
        data.filter((task) => {
          return task.status === 'complete';
        })
      );
      setPending(
        data.filter((task) => {
          return task.status === 'pending';
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className='p-4 w-full'>
      <h1 className='text-center font-bold text-lg'>{dateString}</h1>

      {loading && (
        <div className='mt-3 flex justify-center'>
          <Spinner />
        </div>
      )}

      <div className='mt-6 w-full flex justify-between sm:justify-around'>
        <div className='flex flex-col gap-2 items-center'>
          <p className='font-semibold text-lg'>Completed Task: </p>
          {!loading &&
            completed?.map((task) => {
              return (
                <ul key={task._id}>
                  <p className='shadow-xl bg-blue-600 py-3 px-4 rounded-md text-white'>
                    {task.task}
                  </p>
                </ul>
              );
            })}
        </div>

        <div>
          <p className='font-semibold text-lg'>Pending Task: </p>
          {!loading &&
            pending?.map((task) => {
              return (
                <ul key={task._id}>
                  <p className='shadow-xl bg-red-600 py-3 px-4 rounded-md text-white'>
                    {task.task}
                  </p>
                </ul>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TwoDayOld;
