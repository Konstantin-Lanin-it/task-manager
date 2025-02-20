import React, { useState } from 'react';
import { createTask } from '../api'; // Импорт функции API для создания задач

const AddTask = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleAddTask = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        setError(null); // Сбрасываем ошибки
        setSuccess(false); // Сбрасываем статус успеха

        try {
            const response = await createTask({ title, description });
            if (response.status === 201) {
                setSuccess(true);
                onTaskAdded(); // Вызов функции, переданной как пропс, для обновления списка задач
                // Сброс полей формы
                setTitle('');
                setDescription('');
            }
        } catch (err) {
            // Обработка ошибок от API
            setError(err.response?.data?.message || 'Ошибка добавления задачи');
        }
    };

    return (
        <div>
            <h2>Добавить задачу</h2>
            <form onSubmit={handleAddTask}>
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
                <button type="submit">Добавить задачу</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображение ошибки */}
            {success && <p style={{ color: 'green' }}>Задача успешно добавлена!</p>} {/* Успешное сообщение */}
        </div>
    );
};

export default AddTask;