import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/Tasks/TaskList';
import AddTask from './components/Tasks/AddTask';
import EditTask from './components/Tasks/EditTask';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { getTasks } from './api'; // Импорт функции API для получения задач

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks(); // Получаем задачи
                setTasks(response.data);
            } catch (error) {
                console.error('Ошибка при получении задач:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data); // Обновляем состояние задач
            setLoading(false); // Устанавливаем загрузку в false
        } catch (error) {
            console.error('Ошибка при получении задач:', error);
            setLoading(false); // Устанавливаем загрузку в false даже в случае ошибки
        }
    };

    const handleTaskAdded = async (newTask) => {
        try {
            await addTask(newTask); // Добавляем новую задачу в API
            fetchTasks(); // Обновляем список задач после добавления
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
        }
    };

    const handleTaskDeleted = async (taskId) => {
        try {
            await deleteTask(taskId); // Удаляем задачу по ID из API
            fetchTasks(); // Обновляем список задач после удаления
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
        }
    };

    const handleTaskUpdated = async (taskId, updatedTaskData) => {
        try {
            await updateTask(taskId, updatedTaskData); // Обновляем задачу в API
            fetchTasks(); // Обновляем список задач после редактирования
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    };

    return (
        <Router>
            <div className="app">
                <h1>Список задач</h1>
                {loading ? (
                    <p>Загрузка...</p>
                ) : (
                    <Switch>
                        <Route path="/" exact>
                            <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted} />
                        </Route>
                        <Route path="/add-task">
                            <AddTask onTaskAdded={handleTaskAdded} />
                        </Route>
                        <Route path="/edit-task/:taskId">
                            <EditTask onTaskUpdated={handleTaskUpdated} />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Switch>
                )}
            </div>
        </Router>
    );
};

export default App;
