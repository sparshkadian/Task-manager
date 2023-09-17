import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPen } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskItem = ({ data }) => {
  const { deleteTask, setUpdateTaskItem } = useContext(TaskContext);
  const handleTaskDelete = () => {
    deleteTask(data._id);
  };

  const handleTaskUpdate = () => {
    setUpdateTaskItem({ task: data.task, id: data._id });
  };

  return (
    <>
      <div
        className='shadow-xl bg-blue-400 rounded-md text-white py-3 px-4
      flex justify-between gap-4'
      >
        <p className='flex flex-wrap font-base text-lg '>{data.task}</p>

        <div className='flex items-center gap-5'>
          <FontAwesomeIcon
            onClick={handleTaskUpdate}
            className='cursor-pointer'
            icon={faPen}
          />
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
