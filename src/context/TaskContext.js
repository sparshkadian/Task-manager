import { useState, createContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskData, setTaskData] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [updateTaskItem, setUpdateTaskItem] = useState('');
  const [loading, setLoading] = useState(false);

  const getTasksData = async (userId) => {
    const res = await fetch(`http://localhost:4310/api/tasks/${userId}`);
    const data = await res.json();
    setTaskData(data);
  };

  const completeTask = async (taskId) => {
    const res = await fetch(`http://localhost:4310/api/tasks/${taskId}`, {
      method: 'DELETE',
    });

    const returnedData = await res.json();

    setTaskData(returnedData);

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
    setTaskData([...taskData, task]);
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
    setTaskData(
      taskData.map((item) => (item._id === id ? { ...item, ...task } : item))
    );
    setUpdateTaskItem('');
  };

  return (
    <TaskContext.Provider
      value={{
        taskData,
        updateTaskItem,
        tasksCompleted,
        loading,
        setLoading,
        getTasksData,
        completeTask,
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
