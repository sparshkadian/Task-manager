import { createContext } from 'react';
import { useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [updateTaskItem, setUpdateTaskItem] = useState('');

  const userDetails = window.localStorage.getItem('userDetails')
    ? JSON.parse(window.localStorage.getItem('userDetails'))
    : '';

  const getData = async (userId) => {
    const res = await fetch(`http://localhost:4310/api/tasks/${userId}`);
    const {
      data: { data },
    } = await res.json();
    setData(data);
  };

  const deleteTask = async (taskId) => {
    const res = await fetch(`http://localhost:4310/api/tasks/${taskId}`, {
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
    const res = await fetch('http://localhost:4310/api/tasks', {
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

  const updateTask = async (newTask) => {
    const id = updateTaskItem.id;
    const res = await fetch(`http://localhost:4310/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    const { task } = await res.json();
    setData(
      data.map((item) => (item._id === id ? { ...item, ...task } : item))
    );
    setUpdateTaskItem('');
  };

  return (
    <TaskContext.Provider
      value={{
        data,
        updateTaskItem,
        tasksCompleted,
        getData,
        deleteTask,
        addTask,
        setUpdateTaskItem,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
