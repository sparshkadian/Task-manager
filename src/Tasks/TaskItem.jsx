import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { AnimatePresence } from 'framer-motion';

const TaskItem = ({ data }) => {
  const { deleteTask } = useContext(TaskContext);
  const handleTaskDelete = () => {
    deleteTask(data._id);
  };

  return (
    <>
      <div
        className='w-[300px] shadow-xl py-3 bg-blue-400 rounded-md text-white 
      flex items-center justify-around'
      >
        <p className='font-base text-lg'>{data.task}</p>
        <div>
          <FontAwesomeIcon
            onClick={handleTaskDelete}
            className='cursor-pointer'
            icon={faX}
          />
        </div>
      </div>
    </>
  );
};

export default TaskItem;
