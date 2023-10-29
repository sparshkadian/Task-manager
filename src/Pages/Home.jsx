import SideBar from '../components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TasksList from '../Tasks/TasksList';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import TasksStats from '../Tasks/TasksStats';

const Home = () => {
  const { updateTaskItem, addTask, updateTask } = useContext(TaskContext);
  const [task, setTask] = useState('');

  const userDetails = JSON.parse(window.localStorage.getItem('userDetails'));

  useEffect(() => {
    setTask(updateTaskItem.task);
  }, [updateTaskItem.task]);

  const obj = {
    userId: userDetails._id,
    task,
  };
  const handleTextChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (updateTaskItem) {
      updateTask({ task });
      setTask('');
    } else {
      addTask(obj);
      setTask('');
    }
  };

  return (
    <div className='relative h-screen top-0'>
      <div className='absolute'>
        <SideBar />
      </div>
      <h1 className='heading text-center'>Task Manager</h1>
      <div className='mt-10'>
        <div className='grid'>
          <div className='w-5/6 md:w-1/2 justify-self-center'>
            <p className='text-center text-lg'>
              {updateTaskItem ? 'Update Task' : 'Add a new Task'}
            </p>
            <div className='mt-2 input-container  relative overflow-hidden'>
              {' '}
              <input
                className='outline-none border-2 w-full p-2 overflow-hidden'
                type='text'
                value={task}
                onChange={handleTextChange}
              />
              <button className='absolute text-xl h-full w-[50px] top-0 right-0  bg-blue-300'>
                <FontAwesomeIcon
                  onClick={handleAddTask}
                  icon={faPlus}
                  color='white'
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <TasksList />
      </div>

      <div className='task-stats'>
        <TasksStats />
      </div>
    </div>
  );
};

export default Home;
