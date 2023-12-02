import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPen } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskItem = ({ data }) => {
  const { completeTask, updateTaskItem, setUpdateTaskItem } =
    useContext(TaskContext);

  const handleTaskDelete = () => {
    completeTask(data._id);
  };

  const handleTaskUpdate = () => {
    setUpdateTaskItem({ task: data.task, id: data._id });
  };

  const checkBeingUpdated = () => {
    if (data._id === updateTaskItem.id) {
      return true;
    } else return false;
  };

  return (
    <>
      <div
        className={`shadow-xl ${
          checkBeingUpdated() ? 'bg-red-500' : 'bg-blue-600'
        } rounded-md text-white py-3 px-4
      flex justify-between gap-4`}
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
