import React from 'react';
import { useHistory } from 'react-router-dom'; // Для навигации на страницу редактирования задачи
import { deleteTask } from '../api'; // Импорт функции API для удаления задач

const TaskItem = ({ task, onTaskDeleted, onTaskUpdated }) => {
    const history = useHistory(); // Хук для навигации

    const handleEdit = () => {
        history.push(`/edit-task/${task._id}`); // Редирект на страницу редактирования задачи
    };

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            try {
                await deleteTask(task._id); // Вызов API для удаления задачи
                onTaskDeleted(); // Вызов функции, переданной как пропс, для обновления списка задач
            } catch (error) {
                console.error('Ошибка удаления задачи:', error);
            }
        }
    };

    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
                Статус: {task.status ? 'Выполнено' : 'Не выполнено'}
            </p>
            <p>Дата создания: {new Date(task.createdAt).toLocaleString()}</p>
            <button onClick={handleEdit}>Редактировать</button>
            <button onClick={handleDelete}>Удалить</button>
        </div>
    );
};

export default TaskItem;