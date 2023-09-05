import { useContext, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import { getAuth } from 'firebase/auth';
import TaskItem from './TaskItem';

const TasksList = () => {
  const auth = getAuth();
  const { data, getData } = useContext(TaskContext);

  let user = auth.currentUser.displayName;
  user = user.split(' ');
  user = user[0];

  useEffect(() => {
    getData(user);
  }, []);

  return (
    <>
      <div className='mt-10 w-[55%] m-auto'>
        <div className='flex justify-center lg:justify-between flex-wrap gap-4'>
          {data?.map((task, i) => {
            return <TaskItem key={i} data={task} />;
          })}
        </div>
      </div>
    </>
  );
};

export default TasksList;
