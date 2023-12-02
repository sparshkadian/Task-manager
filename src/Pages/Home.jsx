import { useState, useEffect, useRef, useContext } from 'react';
import TaskContext from '../context/TaskContext';
import TasksList from '../Tasks/TasksList';
import SideBar from '../components/SideBar';
import TasksStats from '../Tasks/TasksStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const inputRef = useRef(null);
  const [task, setTask] = useState('');
  const { updateTaskItem, addTask, updateTask } = useContext(TaskContext);

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

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!task) return;
    else if (updateTaskItem) {
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
            <p className='text-center text-xl mb-2'>
              {updateTaskItem ? 'Update Task' : 'Add a new Task'}
            </p>{' '}
            <form
              onSubmit={handleAddTask}
              className='bg-slate-100 flex items-center shadow-xl rounded-xl '
            >
              <input
                ref={inputRef}
                className='bg-transparent text-lg w-full p-3 focus:outline-none'
                spellCheck='false'
                type='text'
                value={task}
                onChange={handleTextChange}
              />
              <FontAwesomeIcon
                type='submit'
                onClick={handleAddTask}
                icon={faPlus}
                className='mr-3 hover:bg-slate-200 p-2 rounded-full cursor-pointer text-[22px]'
              />
            </form>
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
