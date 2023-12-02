import { useContext, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import TaskItem from './TaskItem';

const TasksList = () => {
  const { taskData, getTasksData } = useContext(TaskContext);

  const userDetails = window.localStorage.getItem('userDetails')
    ? JSON.parse(window.localStorage.getItem('userDetails'))
    : '';

  useEffect(() => {
    getTasksData(userDetails._id);
  }, []);

  return (
    <>
      <div className='mt-10 w-4/5 sm:w-1/2 m-auto'>
        <div className='flex flex-col gap-5'>
          {taskData?.map((task, i) => {
            return <TaskItem key={i} data={task} />;
          })}
        </div>
      </div>
    </>
  );
};

export default TasksList;
