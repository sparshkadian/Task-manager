import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TasksStats = () => {
  const { taskData, tasksCompleted } = useContext(TaskContext);

  if (taskData.length === 0) {
    return (
      <div className='task-stats-container'>
        <p>Start Adding Tasks to your list</p>
      </div>
    );
  } else
    return (
      <div className='task-stats-container'>
        <p>
          You have {taskData.length} item{+(taskData.length === 1) ? '' : 's'}{' '}
          in your list.
        </p>
      </div>
    );
};

export default TasksStats;
