import { useContext, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import { getAuth } from 'firebase/auth';
import TaskItem from './TaskItem';

const TasksList = () => {
  const auth = getAuth();
  const { data, getData } = useContext(TaskContext);

  let userEmail = auth.currentUser.email;

  useEffect(() => {
    getData(userEmail);
  }, []);

  return (
    <>
      <div className='mt-10 w-4/5 sm:w-1/2 m-auto'>
        <div className='flex flex-col gap-5'>
          {data?.map((task, i) => {
            return <TaskItem key={i} data={task} />;
          })}
        </div>
      </div>
    </>
  );
};

export default TasksList;
