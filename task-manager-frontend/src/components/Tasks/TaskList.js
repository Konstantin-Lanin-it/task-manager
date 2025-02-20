import React, { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask } from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Ошибка при получении задач:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      // Обновление списка задач после удаления
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  return (
    <div>
      <h2>Задачи</h2>
      {tasks.length === 0 ? (
        <p>Нет задач для отображения.</p>
      ) : (
        tasks.map(task => (
          <div key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleDelete(task._id)}>Удалить</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;