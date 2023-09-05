import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TasksStats = () => {
  const { data, tasksCompleted } = useContext(TaskContext);

  if (data.length === 0) {
    return (
      <div className='task-stats-container'>
        <p>Start Adding Tasks to your list</p>
      </div>
    );
  } else
    return (
      <div className='task-stats-container'>
        <p>
          You have {data.length} item{+(data.length === 1) ? '' : 's'} in your
          list.
        </p>
      </div>
    );
};

export default TasksStats;
