import React, { useState, useEffect } from 'react';
import { getTask, updateTask } from '../api'; // Импорт функций API для получения и обновления задач
import { useParams } from 'react-router-dom'; // Для получения параметров URL

const EditTask = ({ onTaskUpdated }) => {
    const { taskId } = useParams(); // Получаем ID задачи из параметров URL
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTask(taskId); // Получаем задачу по ID
                setTitle(response.data.title);
                setDescription(response.data.description);
            } catch (err) {
                setError(err.response?.data?.message || 'Ошибка загрузки задачи');
            }
        };

        fetchTask();
    }, [taskId]);

    const handleUpdateTask = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        setError(null); // Сбрасываем ошибки
        setSuccess(false); // Сбрасываем статус успеха

        try {
            const response = await updateTask(taskId, { title, description });
            if (response.status === 200) {
                setSuccess(true);
                onTaskUpdated(); // Вызов функции, переданной как пропс, чтобы обновить список задач
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка обновления задачи');
        }
    };

    return (
        <div>
            <h2>Редактировать задачу</h2>
            <form onSubmit={handleUpdateTask}>
                <div>
                    <label htmlFor="title">Заголовок:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Сохранить изменения</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображение ошибки */}
            {success && <p style={{ color: 'green' }}>Задача успешно обновлена!</p>} {/* Успешное сообщение */}
        </div>
    );
};

export default EditTask;