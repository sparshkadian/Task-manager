import { createContext } from 'react';
import { useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const getData = async (userName) => {
    const res = await fetch(
      `https://taskmanager-api-52du.onrender.com/api/tasks?userName=${userName}`
    );
    const {
      data: { data },
    } = await res.json();
    setData(data);
  };

  const deleteTask = async (taskId) => {
    const res = await fetch(`https://taskmanager-api-52du.onrender.com/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    setData(
      data.filter((task) => {
        return task._id !== taskId;
      })
    );

    setTasksCompleted((prevState) => {
      return prevState + 1;
    });
  };

  const addTask = async (obj) => {
    const res = await fetch('https://taskmanager-api-52du.onrender.com/api/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    const {
      data: { task },
    } = await res.json();
    setData([...data, task]);
  };

  return (
    <TaskContext.Provider
      value={{ data, tasksCompleted, getData, deleteTask, addTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
